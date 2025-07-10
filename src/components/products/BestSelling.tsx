'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PiHandbagBold } from 'react-icons/pi'
import { RiPokerHeartsLine } from 'react-icons/ri'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

import bestbag1 from '../../../public/best-selling-images/best-selling-bag-1.png'
import bestbag2 from '../../../public/best-selling-images/best-selling-bag-2.png'
import bestbag3 from '../../../public/best-selling-images/best-selling-bag-3.png'
import { useCart } from '@/components/context/cartContext'

const bestBags = [
  {
    id: 43,
    title: 'Hobo small',
    price: '$195.00 USD',
    image: bestbag1,
  },
  {
    id: 44,
    title: 'Hobo small',
    price: '$195.00 USD',
    image: bestbag2,
  },
  {
    id: 45,
    title: 'Hobo small',
    price: '$195.00 USD',
    image: bestbag3,
  },
]

const BestSelling = () => {
  const router = useRouter()
  const { cartItems, toggleCart } = useCart()

  return (
    <section className='mx-4 my-8'>
      <div>
        {/* Header */}
        <div className='flex justify-between'>
          <h1 className='capitalize text-4xl my-8'>Best selling bags</h1>
          <button className='flex items-center gap-3 text-gray-600'>
            <FaArrowLeft size={12} />
            <span className='text-[13px]'>3/5</span>
            <FaArrowRight size={12} />
          </button>
        </div>

        {/* Product Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {bestBags.map((item) => (
            <div
              key={item.id}
              className='bg-[#F4F4F4] rounded-2xl px-6 py-3 cursor-pointer hover:shadow-md transition-all duration-300'
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <div className='flex justify-between mb-3'>
                <span>
                  <h1 className='text-xl'>{item.title}</h1>
                  <p className='font-bold'>{item.price}</p>
                </span>

                {/* Action Buttons */}
                <div className='flex flex-row gap-2 z-20' onClick={(e) => e.stopPropagation()}>
                  <button
                    className='bg-white rounded-full w-8 h-8 flex items-center justify-center relative'
                    onClick={() => toggleCart(String(item.id))}
                    title='Add to Cart'
                  >
                    <PiHandbagBold size={18} color={cartItems.includes(String(item.id)) ? 'green' : 'black'} />
                    {cartItems.includes(String(item.id)) && (
                        <span className='absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full px-1'>
                            ✓
                        </span>
                    )}
                  </button>

                  <button
                    className='bg-white rounded-full w-8 h-8 flex items-center justify-center'
                    title='Favorite'
                  >
                    <RiPokerHeartsLine size={18} />
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className='flex items-end justify-center'>
                <Image src={item.image} alt='bag-image' className='h-[300px] object-contain' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSelling
