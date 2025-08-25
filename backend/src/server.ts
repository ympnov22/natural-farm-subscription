import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const isDemoMode = process.env.DEMO_MODE === 'true' || process.env.STRIPE_SECRET_KEY === 'demo_mode'

let stripe: Stripe | null = null
if (!isDemoMode) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })
}

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const STRIPE_PLANS = {
  small_monthly: { priceId: 'price_small_monthly', amount: 3000, interval: 'month' },
  small_yearly: { priceId: 'price_small_yearly', amount: 30000, interval: 'year' },
  medium_monthly: { priceId: 'price_medium_monthly', amount: 5000, interval: 'month' },
  medium_yearly: { priceId: 'price_medium_yearly', amount: 50000, interval: 'year' },
  large_monthly: { priceId: 'price_large_monthly', amount: 9000, interval: 'month' },
  large_yearly: { priceId: 'price_large_yearly', amount: 90000, interval: 'year' },
}

const STRIPE_OPTIONS = {
  maintenance: { priceId: 'price_maintenance', amount: 2000 },
  harvest_delivery: { priceId: 'price_harvest_delivery', amount: 1500 },
  materials: { priceId: 'price_materials', amount: 1000 },
}

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { plan, options, isYearly } = req.body

    if (!plan || !plan.id) {
      return res.status(400).json({ error: 'Plan is required' })
    }

    if (isDemoMode) {
      console.log('🎭 Demo Mode: Simulating Stripe checkout session creation')
      console.log('Plan:', plan)
      console.log('Options:', options)
      console.log('Is Yearly:', isYearly)
      
      const demoSessionId = `cs_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      res.json({ sessionId: demoSessionId })
      return
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured' })
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    const planConfig = STRIPE_PLANS[plan.id as keyof typeof STRIPE_PLANS]
    if (!planConfig) {
      return res.status(400).json({ error: 'Invalid plan selected' })
    }

    lineItems.push({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: plan.name,
          description: `区画サイズ: ${plan.size}`,
        },
        recurring: {
          interval: plan.interval === 'month' ? 'month' : 'year',
        },
        unit_amount: plan.price,
      },
      quantity: 1,
    })

    if (options && Array.isArray(options)) {
      for (const option of options) {
        const optionConfig = STRIPE_OPTIONS[option.id as keyof typeof STRIPE_OPTIONS]
        if (optionConfig) {
          lineItems.push({
            price_data: {
              currency: 'jpy',
              product_data: {
                name: option.name,
                description: 'オプションサービス',
              },
              recurring: {
                interval: 'month', // Options are always monthly
              },
              unit_amount: option.price,
            },
            quantity: isYearly ? 12 : 1, // For yearly plans, multiply options by 12
          })
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/plans`,
      metadata: {
        plan_id: plan.id,
        plan_name: plan.name,
        plan_size: plan.size,
        plan_interval: plan.interval,
        options: JSON.stringify(options || []),
        is_yearly: isYearly.toString(),
      },
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

app.post('/api/customer-portal', async (req, res) => {
  try {
    const { customerId } = req.body

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' })
    }

    if (isDemoMode) {
      console.log('🎭 Demo Mode: Simulating customer portal session')
      res.json({ url: `${process.env.FRONTEND_URL}/` })
      return
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured' })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/`,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    res.status(500).json({ error: 'Failed to create customer portal session' })
  }
})

app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  if (isDemoMode) {
    console.log('🎭 Demo Mode: Simulating webhook event')
    res.json({ received: true })
    return
  }

  if (!stripe) {
    return res.status(500).json({ error: 'Stripe not configured' })
  }

  const sig = req.headers['stripe-signature']
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).send('Webhook signature verification failed')
  }

  console.log('Received webhook event:', event.type)
  
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.created':
      console.log(`Handling ${event.type}:`, event.data.object)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
})

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`)
  console.log(`📊 Health check: http://localhost:${port}/health`)
})
