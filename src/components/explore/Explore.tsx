import React from 'react'
import Image from 'next/image'

import holdBagImg from '../../../public/bag-holding-images/holding-bag-1-.png'  
import holdBagImg2 from '../../../public/bag-holding-images/holding-bag-2-.png'
import { HiArrowUpRight } from "react-icons/hi2";
import next from 'next';

const explore = [
    {
        description: 'Modern quality & mind refreshing colour bag',
        img: holdBagImg
    },
    {
        description: 'Latest fashion & beauty leather bag for you',
        img: holdBagImg2
    }
]

const Explore = () => {
  return (
    <section className='mx-4 my-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 '>
            {explore.map((item, index) => (
                <div key={index} className='relative rounded-xl  shadow-lg bg-gray-200'>
                    {/* text overlay */}
                    <div className=' absolute inset-0 bg-gradient-to-t from-gray-600 via-transparent to-transparent  flex flex-col justify-end p-4 '>
                        <div className='flex justify-between items-center'>
                        <h1 className='uppercase text-gray-200 text-lg lg:text-xl font-semibold mb-2 lg:w-[45%]'>
                            {item.description}
                        </h1>
                        <span className=' text-black bg-gray-200 p-2 rounded-full hover:bg-black hover:text-gray-200'>
                            <HiArrowUpRight size={20} />
                        </span>
                        </div>
                    </div>
                    {/* image */}
                    <Image src={item.img} alt="Holding bag" className='w-full h-[500px] object-cover  rounded-xl' />
                </div>
            ))}
        </div>
    </section>
    
  )
}

export default Explore