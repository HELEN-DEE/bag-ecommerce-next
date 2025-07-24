'use client'

import React from 'react'
import { useCart } from '@/components/context/cartContext'
import { products } from '@/data/products'
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from 'next/link'


const CheckoutPage = () => {
    const { cartItems } = useCart()

    const cartProducts = products.filter((product) =>
        cartItems.includes(String(product.id))
    )

    const subtotal = cartProducts.reduce((total, product) => {
        return total + parseFloat(product.price)
    }, 0)

    const tax = subtotal * 0.05 // 5% tax example
    const total = subtotal + tax

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded-md">
        <h1 className="text-2xl font-bold mb-6">Checkout Summary</h1>

        {cartProducts.length === 0 ? (
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
        ) : (
        <>
            <ul className="divide-y divide-gray-200 mb-4">
                {cartProducts.map((product) => (
                <li key={product.id} className="py-3 flex justify-between">
                    <span className="font-medium">{product.title}</span>
                    <span>${parseFloat(product.price).toFixed(2)}</span>
                </li>
                ))}
            </ul>

            <div className="text-right space-y-2">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (5%): ${tax.toFixed(2)}</p>
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors">
                Proceed to Payment
            </button>
        </>
        )}

        <Link href="/" className="mt-4 inline-block text-sm text-white bg-black rounded-lg   hover:bg-gray-800 px-4 py-2 transition-colors">
            <FaLongArrowAltLeft className="inline mr-1" />
            Continue Shopping
        </Link>
    </div>
    )
}

export default CheckoutPage
