import { PlanSelector } from '../components/PlanSelector'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import type { StripePlan, StripeOption } from '../lib/stripe'

export function PlanSelection() {
  const handlePlanSelect = async (plan: StripePlan, options: StripeOption[], isYearly: boolean) => {
    try {
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          options,
          isYearly,
        }),
      })

      const { sessionId } = await response.json()
      
      if (sessionId.startsWith('cs_demo_')) {
        console.log('🎭 Demo Mode: Simulating Stripe checkout redirect')
        window.location.href = `/success?session_id=${sessionId}`
        return
      }
      
      const stripe = await import('../lib/stripe').then(m => m.stripePromise)
      const stripeInstance = await stripe
      
      if (stripeInstance) {
        const { error } = await stripeInstance.redirectToCheckout({
          sessionId,
        })
        
        if (error) {
          console.error('Stripe checkout error:', error)
          alert('決済処理でエラーが発生しました。もう一度お試しください。')
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('決済処理でエラーが発生しました。もう一度お試しください。')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Header />
      <main className="py-12">
        <PlanSelector onPlanSelect={handlePlanSelect} />
      </main>
      <Footer />
    </div>
  )
}
