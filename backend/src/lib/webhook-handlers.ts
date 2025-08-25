import Stripe from 'stripe'
import { DatabaseService } from './supabase'

export class WebhookHandlers {
  static async handleCustomerCreated(customer: Stripe.Customer) {
    console.log('🔄 Processing customer.created event:', customer.id)
    
    const customerData = {
      stripe_customer_id: customer.id,
      email: customer.email || '',
      name: customer.name || undefined
    }

    const result = await DatabaseService.createCustomer(customerData)
    
    if (result) {
      console.log('✅ Customer created in database:', result.id)
    } else {
      console.error('❌ Failed to create customer in database')
    }

    return result
  }

  static async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    console.log('🔄 Processing customer.subscription.created event:', subscription.id)
    
    const metadata = subscription.metadata || {}
    const options = metadata.options ? JSON.parse(metadata.options) : []
    
    const plotSizeMap: { [key: string]: 'small' | 'medium' | 'large' } = {
      'small': 'small',
      'medium': 'medium', 
      'large': 'large'
    }
    
    const plotSize = metadata.plan_size ? plotSizeMap[metadata.plan_size] || 'small' : 'small'
    const billingType = metadata.plan_interval === 'year' ? 'yearly' : 'monthly'
    
    const optionIds = options.map((option: any) => option.id || option)
    
    const subscriptionData = {
      stripe_customer_id: subscription.customer as string,
      stripe_subscription_id: subscription.id,
      plot_size: plotSize,
      billing_type: billingType as 'monthly' | 'yearly',
      status: subscription.status as 'active' | 'cancelled' | 'past_due',
      options: optionIds
    }

    const result = await DatabaseService.createSubscription(subscriptionData)
    
    if (result) {
      console.log('✅ Subscription created in database:', result.id)
    } else {
      console.error('❌ Failed to create subscription in database')
    }

    return result
  }

  static async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    console.log('🔄 Processing customer.subscription.updated event:', subscription.id)
    
    const updates = {
      status: subscription.status as 'active' | 'cancelled' | 'past_due',
      updated_at: new Date().toISOString()
    }

    const result = await DatabaseService.updateSubscription(subscription.id, updates)
    
    if (result) {
      console.log('✅ Subscription updated in database:', result.id)
    } else {
      console.error('❌ Failed to update subscription in database')
    }

    return result
  }

  static async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    console.log('🔄 Processing customer.subscription.deleted event:', subscription.id)
    
    const updates = {
      status: 'cancelled' as const,
      updated_at: new Date().toISOString()
    }

    const result = await DatabaseService.updateSubscription(subscription.id, updates)
    
    if (result) {
      console.log('✅ Subscription cancelled in database:', result.id)
    } else {
      console.error('❌ Failed to cancel subscription in database')
    }

    return result
  }
}
