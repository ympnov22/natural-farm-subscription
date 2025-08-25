import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

export { stripePromise }

export const STRIPE_PLANS = {
  small_monthly: {
    id: 'small_monthly',
    name: '小区画（5㎡）',
    size: '5㎡',
    price: 3000,
    interval: 'month',
    priceId: 'price_small_monthly', // Will be replaced with actual Stripe price IDs
  },
  small_yearly: {
    id: 'small_yearly',
    name: '小区画（5㎡）',
    size: '5㎡',
    price: 30000,
    interval: 'year',
    priceId: 'price_small_yearly',
  },
  medium_monthly: {
    id: 'medium_monthly',
    name: '中区画（10㎡）',
    size: '10㎡',
    price: 5000,
    interval: 'month',
    priceId: 'price_medium_monthly',
  },
  medium_yearly: {
    id: 'medium_yearly',
    name: '中区画（10㎡）',
    size: '10㎡',
    price: 50000,
    interval: 'year',
    priceId: 'price_medium_yearly',
  },
  large_monthly: {
    id: 'large_monthly',
    name: '大区画（20㎡）',
    size: '20㎡',
    price: 9000,
    interval: 'month',
    priceId: 'price_large_monthly',
  },
  large_yearly: {
    id: 'large_yearly',
    name: '大区画（20㎡）',
    size: '20㎡',
    price: 90000,
    interval: 'year',
    priceId: 'price_large_yearly',
  },
} as const

export const STRIPE_OPTIONS = {
  maintenance: {
    id: 'maintenance',
    name: 'お手入れ代行',
    price: 2000,
    priceId: 'price_maintenance',
  },
  harvest_delivery: {
    id: 'harvest_delivery',
    name: '収穫代行＆配送',
    price: 1500,
    priceId: 'price_harvest_delivery',
  },
  materials: {
    id: 'materials',
    name: '資材パック',
    price: 1000,
    priceId: 'price_materials',
  },
} as const

export type StripePlan = typeof STRIPE_PLANS[keyof typeof STRIPE_PLANS]
export type StripeOption = typeof STRIPE_OPTIONS[keyof typeof STRIPE_OPTIONS]
