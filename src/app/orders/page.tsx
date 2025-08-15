'use client'

import React from 'react'
import { useCart } from '@/components/context/cartContext'
import Link from 'next/link'
import { FaLongArrowAltLeft } from "react-icons/fa";

const OrdersPage = () => {
    const { orders } = useCart()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'processing':
                return 'bg-yellow-100 text-yellow-800'
            case 'shipped':
                return 'bg-blue-100 text-blue-800'
            case 'delivered':
                return 'bg-purple-100 text-purple-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getPrice = (price: string | number): number => {
        if (typeof price === 'string') {
            const cleanPrice = price.replace(/[^0-9.]/g, '');
            return parseFloat(cleanPrice) || 0;
        }
        return typeof price === 'number' ? price : 0;
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-6">
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <FaLongArrowAltLeft className="mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600 mt-2">Track and manage your order history</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                    <Link href="/products" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            {/* Order Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                                    <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            {/* Order Items */}
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Items Ordered:</h4>
                                <div className="space-y-2">
                                    {order.products.map((product, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{product.title || product.name}</p>
                                                <p className="text-xs text-gray-500">Product ID: {product.id}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ${getPrice(product.price).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax:</span>
                                        <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                                        <span className="text-gray-900">Total:</span>
                                        <span className="text-gray-900">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Actions */}
                            <div className="mt-4 flex gap-3">
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    Track Order
                                </button>
                                <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                                    View Invoice
                                </button>
                                {order.status === 'delivered' && (
                                    <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                                        Reorder
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrdersPage