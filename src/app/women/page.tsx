

'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import { PiHandbag, PiHandbagBold } from "react-icons/pi";
import { RiPokerHeartsLine } from "react-icons/ri";

// images
import bagImage1 from '../../../public/women-images/female-bag-1.png'
import bagImage2 from '../../../public/women-images/female-bag-2.png'
import bagImage3 from '../../../public/women-images/female-bag-3.png'
import bagImage4 from '../../../public/women-images/female-bag-4.png'
import bagImage5 from '../../../public/women-images/female-bag-5.png'
import bagImage6 from '../../../public/women-images/female-bag-6.png'

const radioOptions = [
    { name: 'All collection', value: 'all' },
    { name: 'New collection', value: 'new' },
    { name: 'Popular collection', value: 'popular' }
]
const products = [
    { title: 'Hobo small', price: '$195.00 USD', image: bagImage1 },
    { title: 'Hobo small', price: '$199.00 USD', image: bagImage2 },
    { title: 'Hobo small', price: '$185.00 USD', image: bagImage3 },
    { title: 'Hobo small', price: '$195.00 USD', image: bagImage5 },
    { title: 'Hobo small', price: '$199.00 USD', image: bagImage4 },
    { title: 'Hobo small', price: '$200.00 USD', image: bagImage6 },
]

const page = () => {
    const [selectedOption, setSelectedOption] = useState('')

    return (
        <section className='mx-4 my-6'>
            <div className=''>
                

                {/* Products collection */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-4'>
                    {products.map((product, index) => (
                        <div key={index} className='bg-[#F4F4F4] rounded-xl p-4'>
                            <div className='flex justify-between'>
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
                                <Image src={product.image} alt={product.title} className='h-[300px] object-contain' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default page;
