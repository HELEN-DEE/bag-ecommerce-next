import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Webhook signature verification failed:', error.message)
    } else {
      console.error('Webhook signature verification failed:', error)
    }
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Payment successful:', session.id)
        
        // Here you can:
        // 1. Update your database with the order
        // 2. Send confirmation emails
        // 3. Update inventory
        // 4. Trigger fulfillment processes
        
        await handleSuccessfulPayment(session)
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object
        console.log('Payment failed:', paymentIntent.id)
        
        // Handle failed payment
        await handleFailedPayment(paymentIntent)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    // Retrieve the full session with line items
    const fullSession = await stripe().checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'line_items.data.price.product']
    })

    // Extract order information
    const orderData = {
      stripeSessionId: session.id,
      customerEmail: session.customer_email,
      amountTotal: (session.amount_total ?? 0) / 100, // Convert from cents, fallback to 0 if null
      currency: session.currency,
      items: fullSession.line_items?.data || [],
      // shippingAddress: session.shipping_address, // Removed: property does not exist on Session
      billingAddress: session.customer_details?.address,
    }

    // TODO: Save to your database
    console.log('Order to save:', orderData)
    
    // TODO: Send confirmation email
    // await sendOrderConfirmationEmail(orderData)
    
    // TODO: Update inventory
    // await updateInventory(orderData.items)
    
  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}

import type Stripe from 'stripe';

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  try {
    // TODO: Log failed payment
    // TODO: Send notification to admin
    console.log('Failed payment details:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      last_payment_error: paymentIntent.last_payment_error,
    })
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}