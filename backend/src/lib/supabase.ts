import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export interface Customer {
  id: string
  stripe_customer_id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  plot_size: 'small' | 'medium' | 'large'
  billing_type: 'monthly' | 'yearly'
  status: 'active' | 'cancelled' | 'past_due'
  options: string[] // Array of option IDs
  created_at: string
  updated_at: string
}

export class DatabaseService {
  static async createCustomer(customerData: {
    stripe_customer_id: string
    email: string
    name?: string
  }): Promise<Customer | null> {
    if (!supabase) {
      console.log('🎭 Demo Mode: Simulating customer creation in database')
      console.log('Customer data:', customerData)
      return {
        id: `customer_${Date.now()}`,
        stripe_customer_id: customerData.stripe_customer_id,
        email: customerData.email,
        name: customerData.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([{
          stripe_customer_id: customerData.stripe_customer_id,
          email: customerData.email,
          name: customerData.name
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating customer:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error creating customer:', error)
      return null
    }
  }

  static async createSubscription(subscriptionData: {
    stripe_customer_id: string
    stripe_subscription_id: string
    plot_size: 'small' | 'medium' | 'large'
    billing_type: 'monthly' | 'yearly'
    status: 'active' | 'cancelled' | 'past_due'
    options: string[]
  }): Promise<Subscription | null> {
    if (!supabase) {
      console.log('🎭 Demo Mode: Simulating subscription creation in database')
      console.log('Subscription data:', subscriptionData)
      return {
        id: `subscription_${Date.now()}`,
        ...subscriptionData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([subscriptionData])
        .select()
        .single()

      if (error) {
        console.error('Error creating subscription:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error creating subscription:', error)
      return null
    }
  }

  static async updateSubscription(
    stripe_subscription_id: string,
    updates: Partial<Subscription>
  ): Promise<Subscription | null> {
    if (!supabase) {
      console.log('🎭 Demo Mode: Simulating subscription update in database')
      console.log('Updating subscription:', stripe_subscription_id, 'with:', updates)
      return {
        id: `subscription_${Date.now()}`,
        stripe_customer_id: 'cus_demo',
        stripe_subscription_id,
        plot_size: 'medium',
        billing_type: 'monthly',
        status: 'active',
        options: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...updates
      } as Subscription
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('stripe_subscription_id', stripe_subscription_id)
        .select()
        .single()

      if (error) {
        console.error('Error updating subscription:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error updating subscription:', error)
      return null
    }
  }

  static async getSubscriptionByStripeId(stripe_subscription_id: string): Promise<Subscription | null> {
    if (!supabase) {
      console.log('🎭 Demo Mode: Simulating subscription fetch from database')
      console.log('Fetching subscription:', stripe_subscription_id)
      return {
        id: `subscription_${Date.now()}`,
        stripe_customer_id: 'cus_demo',
        stripe_subscription_id,
        plot_size: 'medium',
        billing_type: 'monthly',
        status: 'active',
        options: ['maintenance'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('stripe_subscription_id', stripe_subscription_id)
        .single()

      if (error) {
        console.error('Error fetching subscription:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error fetching subscription:', error)
      return null
    }
  }

  static async getCustomerByStripeId(stripe_customer_id: string): Promise<Customer | null> {
    if (!supabase) {
      console.log('🎭 Demo Mode: Simulating customer fetch from database')
      console.log('Fetching customer:', stripe_customer_id)
      return {
        id: `customer_${Date.now()}`,
        stripe_customer_id,
        email: 'demo@example.com',
        name: 'デモユーザー',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('stripe_customer_id', stripe_customer_id)
        .single()

      if (error) {
        console.error('Error fetching customer:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error fetching customer:', error)
      return null
    }
  }
}
