
// 'use client'

// import React, { useState } from 'react'
// import { useCart } from '@/components/context/cartContext'
// import { products } from '@/data/products'
// import { FaLongArrowAltLeft } from 'react-icons/fa'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { toast } from 'sonner'

// interface Product {
//   id: number
//   title: string
//   price: number | string
// }

// interface Order {
//   id: string
//   subtotal: number
//   tax: number
//   total: number
//   products: Product[]
// }

// const CheckoutPage: React.FC = () => {
//   const { cartItems, placeOrder } = useCart()
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [orderPlaced, setOrderPlaced] = useState(false)
//   const [placedOrder, setPlacedOrder] = useState<Order | null>(null)
//   const router = useRouter()

//   const cartProducts: Product[] = products.filter((product: Product) =>
//     cartItems.includes(String(product.id))
//   )

//   const getPrice = (product: Product): number => {
//     const priceValue = product.price || 0
//     if (typeof priceValue === 'string') {
//       const cleanPrice = priceValue.replace(/[^0-9.]/g, '')
//       return parseFloat(cleanPrice) || 0
//     }
//     return priceValue
//   }

//   const subtotal = cartProducts.reduce((total, product) => total + getPrice(product), 0)
//   const tax = subtotal * 0.05
//   const total = subtotal + tax

//   const handlePlaceOrder = async () => {
//     setIsProcessing(true)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000))
//       const orderData: Omit<Order, 'id'> = { subtotal, tax, total, products: cartProducts }
//       const newOrder = await placeOrder(orderData)
//       setPlacedOrder(newOrder)
//       setOrderPlaced(true)
//       toast.success('Order placed successfully!')
//     } catch (error: unknown) {
//       console.error('Failed to place order:', error)
//       toast.error('Failed to place order. Please try again.')
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleContinueShopping = () => {
//     router.push('/')
//   }

//   const handleViewOrders = () => {
//     router.push('/orders')
//   }

//   if (orderPlaced && placedOrder) {
//     return (
//       <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded-md text-center">
//         <div className="mb-6">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg
//               className="w-8 h-8 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               aria-label="Order Success Checkmark"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
//           <p className="text-gray-600">Order ID: #{placedOrder.id}</p>
//           <p className="text-gray-600">Total: ${placedOrder.total.toFixed(2)}</p>
//         </div>
//         <div className="space-y-3">
//           <button
//             onClick={handleViewOrders}
//             className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
//             aria-label="View My Orders"
//           >
//             View My Orders
//           </button>
//           <button
//             onClick={handleContinueShopping}
//             className="w-full bg-gray-100 text-gray-700 py-3 rounded hover:bg-gray-200 transition-colors"
//             aria-label="Continue Shopping"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded-md">
//       <h1 className="text-2xl font-bold mb-6">Checkout Summary</h1>
//       {cartProducts.length === 0 ? (
//         <p className="text-gray-500 mb-4">Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="divide-y divide-gray-200 mb-4">
//             {cartProducts.map((product) => (
//               <li key={product.id} className="py-3 flex justify-between">
//                 <span className="font-medium">{product.title}</span>
//                 <span>${getPrice(product).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="text-right space-y-2 border-t pt-4">
//             <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
//             <p className="text-gray-600">Tax (5%): ${tax.toFixed(2)}</p>
//             <p className="text-xl font-bold border-t pt-2">Total: ${total.toFixed(2)}</p>
//           </div>
//           <button
//             onClick={handlePlaceOrder}
//             disabled={isProcessing}
//             className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             aria-label="Proceed to Payment"
//           >
//             {isProcessing ? 'Processing...' : 'Proceed to Payment'}
//           </button>
//         </>
//       )}
//       <Link
//         href="/"
//         className="mt-4 inline-block text-sm text-white bg-black rounded-lg hover:bg-gray-800 px-4 py-2 transition-colors"
//         aria-label="Continue Shopping"
//       >
//         <FaLongArrowAltLeft className="inline mr-1" />
//         Continue Shopping
//       </Link>
//     </div>
//   )
// }

// export default CheckoutPage
