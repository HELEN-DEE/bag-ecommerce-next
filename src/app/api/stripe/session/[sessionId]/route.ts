import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/../lib/stripe'

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Return relevant session data
    return NextResponse.json({
      sessionId: session.id,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
      currency: session.currency,
      paymentStatus: session.payment_status,
      status: session.status,
      lineItems: session.line_items?.data.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        amountTotal: item.amount_total / 100, // Convert from cents
        currency: item.currency,
        price: {
          id: item.price?.id,
          unitAmount: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
          product: item.price?.product
        }
      })) || []
    })
  } catch (error: unknown) {
    console.error('Session retrieval error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve session',
        details:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.message
            : undefined
      },
      { status: 500 }
    )
  }
}