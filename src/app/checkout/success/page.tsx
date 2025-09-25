'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaCheck, FaSpinner, FaLongArrowAltLeft } from 'react-icons/fa'
import { useCart } from '@/components/context/cartContext'

interface PaymentDetails {
  sessionId: string
  customerEmail: string | null
  amountTotal: number
  currency: string
  paymentStatus: string
}

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    // Fetch payment details from Stripe
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`/api/stripe/session/${sessionId}`)
        
        if (!response.ok) {
          throw new Error('Failed to retrieve payment details')
        }

        const details = await response.json()
        setPaymentDetails(details)
        
        // Clear the cart since payment was successful
        clearCart()
        
      } catch (err: unknown) {
        console.error('Error fetching payment details:', err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to retrieve payment details')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentDetails()
  }, [searchParams, clearCart])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="flex items-center justify-center mb-4">
          <FaSpinner className="animate-spin w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h1>
        <p className="text-gray-600">Please wait while we verify your payment.</p>
      </div>
    )
  }

  if (error || !paymentDetails) {
    return (
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Verification Failed</h1>
        <p className="text-gray-600 mb-6">{error || 'Unable to verify payment details'}</p>
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Return to Checkout
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaLongArrowAltLeft className="inline mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Session ID:</span>
            <span className="font-mono text-gray-900">{paymentDetails.sessionId.slice(-8)}</span>
          </div>
          {paymentDetails.customerEmail && (
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900">{paymentDetails.customerEmail}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="text-gray-900 font-semibold">
              ${paymentDetails.amountTotal.toFixed(2)} {paymentDetails.currency.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600 font-medium capitalize">
              {paymentDetails.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/orders"
          className="block w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          View My Orders
        </Link>
        <Link
          href="/"
          className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FaLongArrowAltLeft className="inline mr-2" />
          Continue Shopping
        </Link>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Youll receive a confirmation email shortly</li>
          <li>• Your order will be processed within 24 hours</li>
          <li>• Shipping updates will be sent to your email</li>
        </ul>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <FaSpinner className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" />
        <p>Loading...</p>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}