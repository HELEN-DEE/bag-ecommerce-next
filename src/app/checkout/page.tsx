'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { useCart, type Product as CartProduct, type Order } from '@/components/context/cartContext'
import { products } from '@/data/products'
import { FaLongArrowAltLeft, FaCheck, FaCreditCard, FaShoppingBag } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

// Type definitions that match your cart context
interface Product {
  id: number | string
  title?: string
  name?: string
  price: number | string
  description?: string
  category?: string
  image?: string
}

// Order data type for placing orders (matches your cart context)
type OrderData = Omit<Order, 'id' | 'date' | 'items' | 'status'>

// Stripe checkout item type
interface StripeCheckoutItem {
  id: string | number
  name: string
  price: number
  quantity: number
}

// Constants
const TAX_RATE = 0.05 // 5% tax rate (Note: Stripe can handle automatic tax)
const PROCESSING_DELAY = 1500 // 1.5 seconds for demo

const CheckoutPage: React.FC = () => {
  const { cartItems, placeOrder } = useCart()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<'local' | 'stripe'>('stripe')
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const router = useRouter()

  // Memoized cart products to prevent unnecessary recalculations
  const cartProducts: Product[] = useMemo(() => {
    if (!cartItems || cartItems.length === 0 || !products) return []
    
    return products.filter((product: Product) => {
      const productId = String(product.id)
      return cartItems.includes(productId)
    })
  }, [cartItems])

  // Utility function to safely parse price
  const getPrice = useCallback((product: Product): number => {
    if (!product || product.price == null) return 0
    
    const priceValue = product.price
    if (typeof priceValue === 'string') {
      // Remove all non-numeric characters except decimal points
      const cleanPrice = priceValue.replace(/[^0-9.]/g, '')
      const parsedPrice = parseFloat(cleanPrice)
      return isNaN(parsedPrice) ? 0 : parsedPrice
    }
    
    if (typeof priceValue === 'number') {
      return isNaN(priceValue) ? 0 : priceValue
    }
    
    return 0
  }, [])

  // Get product title safely
  const getProductTitle = useCallback((product: Product): string => {
    return product.title || product.name || 'Unnamed Product'
  }, [])

  // Memoized calculations
  const subtotal = useMemo(() => {
    return cartProducts.reduce((total, product) => total + getPrice(product), 0)
  }, [cartProducts, getPrice])

  const tax = useMemo(() => {
    return subtotal * TAX_RATE
  }, [subtotal])

  const total = useMemo(() => {
    return subtotal + tax
  }, [subtotal, tax])

  // Handle Stripe payment
  const handleStripePayment = useCallback(async (): Promise<void> => {
    if (cartProducts.length === 0 || total <= 0) {
      toast.error('Invalid cart or total amount')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Prepare items for Stripe
      const stripeItems: StripeCheckoutItem[] = cartProducts.map(product => ({
        id: product.id,
        name: getProductTitle(product),
        price: getPrice(product),
        quantity: 1, // You can modify this based on your cart structure
      }))

      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: stripeItems,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout?cancelled=true`,
          customerEmail: customerEmail || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      if (!url) {
        throw new Error('No checkout URL received')
      }

      // Redirect to Stripe Checkout
      window.location.href = url

    } catch (error: unknown) {
      console.error('Stripe payment error:', error)
      if (error instanceof Error) {
        setError(error.message || 'Failed to process payment')
        toast.error(error.message || 'Failed to process payment')
      } else {
        setError('Failed to process payment')
        toast.error('Failed to process payment')
      }
    } finally {
      setIsProcessing(false)
    }
  }, [cartProducts, total, customerEmail, getProductTitle, getPrice])

  // Handle local order placement (existing functionality)
  const handleLocalOrder = useCallback(async (): Promise<void> => {
    if (cartProducts.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    if (total <= 0) {
      toast.error('Invalid order total')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Simulate processing delay
      await new Promise<void>((resolve) => setTimeout(resolve, PROCESSING_DELAY))
      
      // Convert products to match cart context Product type
      const orderProducts: CartProduct[] = cartProducts.map(product => ({
        id: product.id,
        title: getProductTitle(product),
        name: product.name,
        price: product.price
      }))

      // Create order data that matches your cart context expectations
      const orderData: OrderData = {
        products: orderProducts,
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        total: Number(total.toFixed(2))
      }

      // Place order using your cart context (synchronous)
      const newOrder = placeOrder(orderData)
      
      if (!newOrder || !newOrder.id) {
        throw new Error('Invalid order response')
      }

      setPlacedOrder(newOrder)
      setOrderPlaced(true)
      
      toast.success('Order placed successfully!')
    } catch (error: unknown) {
      console.error('Failed to place order:', error)
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to place order. Please try again.'
      
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }, [cartProducts, subtotal, tax, total, placeOrder, getProductTitle])

  const handlePlaceOrder = useCallback(async (): Promise<void> => {
    if (paymentMethod === 'stripe') {
      await handleStripePayment()
    } else {
      await handleLocalOrder()
    }
  }, [paymentMethod, handleStripePayment, handleLocalOrder])

  const handleContinueShopping = useCallback((): void => {
    router.push('/')
  }, [router])

  const handleViewOrders = useCallback((): void => {
    router.push('/orders')
  }, [router])

  const handleRetry = useCallback((): void => {
    setError('')
    setOrderPlaced(false)
    setPlacedOrder(null)
  }, [])

  // Success screen
  if (orderPlaced && placedOrder) {
    return (
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="w-8 h-8 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
          <div className="text-gray-600 space-y-1">
            <p>Order ID: <span className="font-mono font-medium">#{placedOrder.id}</span></p>
            <p>Total: <span className="font-semibold">${placedOrder.total.toFixed(2)}</span></p>
            <p className="text-sm">
              Placed on: {new Date(placedOrder.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleViewOrders}
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2"
            type="button"
            aria-label="View My Orders"
          >
            View My Orders
          </button>
          <button
            onClick={handleContinueShopping}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            type="button"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  // Main checkout screen
  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <FaLongArrowAltLeft className="mr-2" />
          Back to Shopping
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-1">Review your order and complete your purchase</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
          <div className="mt-3">
            <button
              onClick={handleRetry}
              className="text-sm text-red-600 hover:text-red-500 underline"
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Cart Content */}
      {cartProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some items to your cart to continue shopping</p>
          <Link
            href="/"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaLongArrowAltLeft className="mr-2" />
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200 mb-6">
              {cartProducts.map((product, index) => (
                <li key={`${product.id}-${index}`} className="py-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{getProductTitle(product)}</h3>
                    {product.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">ID: {product.id}</p>
                  </div>
                  <span className="font-semibold text-gray-900 ml-4">
                    ${getPrice(product).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {paymentMethod === 'local' && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>${paymentMethod === 'stripe' ? subtotal.toFixed(2) : total.toFixed(2)}</span>
              </div>
              {paymentMethod === 'stripe' && (
                <p className="text-xs text-gray-500">Tax and shipping calculated at checkout</p>
              )}
            </div>
          </div>

          {/* Customer Email for Stripe */}
          {paymentMethod === 'stripe' && (
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                We&#39;ll send your receipt and order updates to this email
              </p>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="stripe"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'stripe')}
                  className="mr-3"
                />
                <label htmlFor="stripe" className="flex items-center cursor-pointer">
                  <FaCreditCard className="mr-2 text-blue-600" />
                  <span>Secure Card Payment (Stripe)</span>
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recommended</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="local"
                  name="payment"
                  value="local"
                  checked={paymentMethod === 'local'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'local')}
                  className="mr-3"
                />
                <label htmlFor="local" className="flex items-center cursor-pointer">
                  <FaShoppingBag className="mr-2 text-gray-600" />
                  <span>Test Order (Local)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || cartProducts.length === 0 || total <= 0}
              className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-black focus:ring-offset-2"
              type="button"
              aria-label={isProcessing ? 'Processing your order' : 'Place your order'}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {paymentMethod === 'stripe' ? 'Redirecting to Payment...' : 'Processing Order...'}
                </span>
              ) : (
                <>
                  {paymentMethod === 'stripe' ? (
                    <>Pay with Stripe • ${subtotal.toFixed(2)}</>
                  ) : (
                    <>Place Order • ${total.toFixed(2)}</>
                  )}
                </>
              )}
            </button>

            <Link
              href="/"
              className="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <FaLongArrowAltLeft className="inline mr-2" />
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default CheckoutPage