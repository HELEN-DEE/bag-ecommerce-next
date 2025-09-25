import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
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