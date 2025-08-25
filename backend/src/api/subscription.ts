import { DatabaseService } from '../lib/supabase'

export class SubscriptionAPI {
  static async getSubscriptionData(sessionId: string) {
    try {
      if (process.env.DEMO_MODE === 'true') {
        return {
          id: sessionId,
          customer_email: 'demo@example.com',
          amount_total: 7000,
          currency: 'jpy',
          payment_status: 'paid',
          subscription: {
            id: 'sub_demo_123',
            current_period_start: Date.now() / 1000,
            current_period_end: (Date.now() / 1000) + (30 * 24 * 60 * 60),
          },
          metadata: {
            plan_name: '中区画（10㎡）',
            plan_size: '10㎡',
            plan_interval: 'month',
            options: JSON.stringify([
              { id: 'maintenance', name: 'お手入れ代行', price: 2000 }
            ])
          }
        }
      }

      return null
    } catch (error) {
      console.error('Error fetching subscription data:', error)
      return null
    }
  }
}
