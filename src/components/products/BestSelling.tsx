import React from 'react'

import Image from 'next/image'

import bestbag1 from '../../../public/best-selling-bag-1.png'
import bestbag2 from '../../../public/best-selling-bag-2.png'
import bestbag3 from '../../../public/best-selling-bag-3.png'

import { PiHandbagBold } from "react-icons/pi";
import { RiPokerHeartsLine } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const bestBags =[
    {
        title: 'Hobo small',
        price: '$195.00 USD',
        image: bestbag1
    },
    {
        title: 'Hobo small',
        price: '$195.00 USD',
        image: bestbag2
    },
    {
        title: 'Hobo small',
        price: '$195.00 USD',
        image: bestbag3
    }
]

const BestSelling = () => {
  return (
    <section className='mx-4 my-8'>
        <div className=' '>
            <div className='flex justify-between'>
                <h1 className='capitalize text-4xl my-8'>
                    Best selling bags
                </h1>
                <button className='flex items-center gap-3  text-gray-600'>
                    <span className=''>
                        <FaArrowLeft size={12} />
                    </span>
                    <span className='text-[13px]'>
                        3/5
                    </span>
                    <span>
                        <FaArrowRight size={12} />
                    </span>

                </button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 '>
                {bestBags.map((item, index) => (
                    <div key={index} className='bg-[#F4F4F4] rounded-xl px-6 py-3'>
                        <div className='flex justify-between'>
                            <span>
                                <h1 className='text-xl'>{item.title}</h1>
                                <p className='font-bold'>{item.price}</p>
                            </span>
                            <div className="flex flex-row gap-2">
                                <span className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
                                    <PiHandbagBold size={18} />
                                </span>
                                <span className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
                                    <RiPokerHeartsLine size={18} />
                                </span>
                            </div>
                        </div>
                        <div className='flex items-end justify-center '>
                            <Image src={item.image} alt="bag-image" className=' h-[300px] object-contain '/>
                        </div>
                    </div>
                ) )}
            </div>
            
        </div>
    </section>
  )
}

export default BestSelling