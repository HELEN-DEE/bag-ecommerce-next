'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { IoCartOutline } from "react-icons/io5"
import { RiPokerHeartsLine } from "react-icons/ri"
import { IoMdCheckmark } from "react-icons/io"
import { products } from "@/data/products"
import { useCart } from '@/components/context/cartContext'
import { useRouter } from "next/navigation"

const radioOptions = [
  { name: 'All collection', value: 'all' },
  { name: 'New collection', value: 'new' },
  { name: 'Popular collection', value: 'popular' }
]

const Products = () => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type") || "all"
  const [selectedOption, setSelectedOption] = useState(currentType)
  const [favorites, setFavorites] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(6)

  const { cartItems, toggleCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    setSelectedOption(currentType)
    setVisibleCount(6)
  }, [currentType])

  const filteredProducts = selectedOption === 'all'
    ? products
    : products.filter(product => product.category === selectedOption)

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredProducts.length))
  }

  const handleShowLess = () => {
    setVisibleCount(6)
  }

  return (
    <section className='mx-4 '>
      <div>
        {/* Filter Buttons */}
        <div className='flex justify-between flex-wrap gap-4 mt-5'>
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
              <span className='text-lg'>{option.name}</span>
            </label>
          ))}
        </div>

        {/* Product Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
          {visibleProducts.map((product) => (
            <div
              key={String(product.id)}
              className='bg-[#F4F4F4] rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-300'
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className='flex justify-between mb-4'>
                <span>
                  <h1 className='text-xl'>{product.title}</h1>
                  <p className='font-bold'>{product.price}</p>
                </span>
                <div className="flex flex-row gap-2 z-20" onClick={e => e.stopPropagation()}>
                  <button
                    className='bg-white rounded-full w-8 h-8 flex items-center justify-center relative'
                    onClick={() => toggleCart(String(product.id))}
                    title="Add to Cart"
                  >
                    <IoCartOutline size={18} color={cartItems.includes(String(product.id)) ? 'green' : 'black'} />
                    {cartItems.includes(String(product.id)) && (
                      <span className='absolute -top-1 -right-1 bg-green-500 text-white rounded-full px-0.5 py-0.5'>
                        <IoMdCheckmark size={10} />
                      </span>
                    )}
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

        {/* Show More / Show Less Buttons */}
        <div className='text-center mt-6'>
          {visibleCount < filteredProducts.length && (
            <button
              className='bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-all mx-2'
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
          {visibleCount > 6 && (
            <button
              className='bg-gray-300 text-black px-6 py-3 rounded hover:bg-gray-400 transition-all mx-2'
              onClick={handleShowLess}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Products
