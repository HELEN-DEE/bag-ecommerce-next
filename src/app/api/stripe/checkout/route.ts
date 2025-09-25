import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/../lib/stripe'
// import { headers } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, successUrl, cancelUrl, customerEmail } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid items provided' },
        { status: 400 }
      )
    }

    // Validate required URLs
    if (!successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Success and cancel URLs are required' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          metadata: {
            productId: String(item.id),
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      automatic_tax: {
        enabled: true,
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'], // Add your allowed countries
      },
      metadata: {
        orderType: 'ecommerce',
        source: 'bagstore_website',
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error)
    
    let errorMessage: string | undefined = undefined;
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (for health check)
export async function GET() {
  return NextResponse.json({ status: 'Stripe API is working' })
}