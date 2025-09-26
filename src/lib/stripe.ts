import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Server-side Stripe instance - lazy initialization
let stripeInstance: Stripe | null = null

export const stripe = () => {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
      typescript: true,
    })
  }
  return stripeInstance
}

// Client-side Stripe instance
export const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
  }
  return loadStripe(publishableKey)
}

// Types for our Stripe integration
export interface StripeCheckoutSession {
  id: string
  url: string | null
  payment_status: string
}

export interface CreateCheckoutSessionData {
  items: Array<{
    id: string | number
    name: string
    price: number
    quantity: number
  }>
  successUrl: string
  cancelUrl: string
  customerEmail?: string
}