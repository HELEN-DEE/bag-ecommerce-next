'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { PiHandbag } from "react-icons/pi"
import { RiPokerHeartsLine } from "react-icons/ri"
import { products } from "@/data/products"

type Product = {
  id: string | number
  title: string
  price: string | number
  image: string
  category: string
}

const radioOptions = [
  { name: 'All collection', value: 'all' },
  { name: 'New collection', value: 'new' },
  { name: 'Popular collection', value: 'popular' }
]

const Products = () => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type") || "all"
  const [selectedOption, setSelectedOption] = useState(currentType)
  const [cartItems, setCartItems] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    setSelectedOption(currentType)
  }, [currentType])

  const filteredProducts = selectedOption === 'all'
    ? products
    : products.filter(product => product.category === selectedOption)

  const toggleCart = (id: string) => {
    setCartItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <section className='mx-4'>
      <div>
        {/* Radio Buttons */}
        <div className='flex justify-between flex-wrap gap-4'>
          {radioOptions.map((option) => (
            <label key={option.value} className='flex gap-2 items-center cursor-pointer'>
              <input
                type="radio"
                name="productFilter"
                value={option.value}
                className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-full checked:bg-black checked:border-black"
                checked={selectedOption === option.value}
                onChange={() => setSelectedOption(option.value)}
              />
              <span className='text-lg'>
                {option.name}
              </span>
            </label>
          ))}
        </div>

        {/* Product Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
          {filteredProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className='bg-[#F4F4F4] rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-300'
              onClick={() => setSelectedProduct(product)}
            >
              <div className='flex justify-between mb-4'>
                <span>
                  <h1 className='text-xl'>{product.title}</h1>
                  <p className='font-bold'>{product.price}</p>
                </span>
                <div className="flex flex-row gap-2 z-20" onClick={e => e.stopPropagation()}>
                  <button
                    className='bg-white rounded-full w-8 h-8 flex items-center justify-center'
                    onClick={() => toggleCart(String(product.id))}
                    title="Add to Cart"
                  >
                    <PiHandbag size={18} color={cartItems.includes(String(product.id)) ? 'green' : 'black'} />
                  </button>
                  <button
                    className='bg-white rounded-full w-8 h-8 flex items-center justify-center'
                    onClick={() => toggleFavorite(String(product.id))}
                    title="Favorite"
                  >
                    <RiPokerHeartsLine size={18} color={favorites.includes(String(product.id)) ? 'red' : 'black'} />
                  </button>
                </div>
              </div>
              <div className='flex justify-center'>
                <Image
                  src={product.image}
                  alt={product.title}
                  className='object-contain'
                  width={300}
                  height={300}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={400}
                height={400}
                className='mx-auto mb-4 object-contain'
              />
              <p className="text-lg font-semibold mb-2">Price: {selectedProduct.price}</p>
              <p className="text-sm text-gray-600 mb-4">Category: {selectedProduct.category}</p>
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                onClick={() => {
                  toggleCart(String(selectedProduct.id))
                  setSelectedProduct(null)
                }}
              >
                {cartItems.includes(String(selectedProduct.id)) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products
