'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { PiHandbag } from "react-icons/pi"
import { RiPokerHeartsLine } from "react-icons/ri"

import { products } from "@/data/products"

const radioOptions = [
    { name: 'All collection', value: 'all' },
    { name: 'New collection', value: 'new' },
    { name: 'Popular collection', value: 'popular' }
    ]

const Products = () => {
    const searchParams = useSearchParams()
    const currentType = searchParams.get("type") || "all"
    const [selectedOption, setSelectedOption] = useState(currentType)

    useEffect(() => {
        setSelectedOption(currentType)
    }, [currentType])

    const filteredProducts = selectedOption === 'all'
        ? products
        : products.filter(product => product.category === selectedOption)

    return (
        <section className='mx-4'>
        <div>
            {/* radio buttons */}
            <div className='flex justify-between flex-wrap gap-4'>
            {radioOptions.map((option, index) => (
                <label key={index} className='flex gap-2 items-center cursor-pointer'>
                <input
                    type="radio"
                    name="productFilter"
                    value={option.value}
                    className="w-5 h-5 appearance-none border-2 rounded-full border-gray-400 checked:bg-black checked:border-black"
                    checked={selectedOption === option.value}
                    onChange={() => setSelectedOption(option.value)}
                />
                <span className='text-lg'>
                    {option.name}
                </span>
                </label>
            ))}
            </div>

            {/* Products collection */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
            {filteredProducts.slice(0, 6).map((product, index) => (
                <div key={index} className='bg-[#F4F4F4] rounded-xl p-4'>
                <div className='flex justify-between mb-4'>
                    <span>
                    <h1 className='text-xl'>{product.title}</h1>
                    <p className='font-bold'>{product.price}</p>
                    </span>
                    <div className="flex flex-row gap-2">
                    <span className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
                        <PiHandbag size={18} />
                    </span>
                    <span className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
                        <RiPokerHeartsLine size={18} />
                    </span>
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
        </div>
        </section>
    )
}

export default Products
