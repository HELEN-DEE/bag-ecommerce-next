import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image'
import CouponBadge from './couponBadge'; 

import bagImage1 from '../../../public/catalog-images/catalog-product-1.png';
import bagImage2 from '../../../public/catalog-images/catalog-product-2.png';

const Products = [
    {
        img: bagImage1,
        title: 'Chelsea - sol', 
    },
    {
        img: bagImage2,
        title: 'Chelsea - malibu', 
    }
]

const Catalog = () => {
  return (
    <section className='mx-4 my-8'>
        <div className='bg-[#F4F4F4] py-4 px-8 rounded-xl'>
            <div className='flex '>
                <span className='flex justify-center w-[50%] mx-auto items-center'>
                    <button className='capitalize flex items-center gap-2 py-3 px-4 border border-gray-500 rounded-full hover:bg-black hover:text-white'>
                        view all catalog
                        <FaArrowRight size={10} />
                    </button>
                </span>
                <p className='text-xl w-[48%]'>
                    All our bags are stain & water-resistant. They look great, wear great and will beautifully complement your life & style.
                </p>
            </div>
            
            {/* Flex container for products & badge */}
            <div className='flex justify-between items-center gap-6'>
                {/* First Product */}
                <div className='flex flex-col items-center'>
                    <Image src={Products[0].img} alt={Products[0].title} className='h-[350px] object-contain'/>
                    <h1 className='text-xl text-center font-bold'>{Products[0].title}</h1>
                </div>

                {/* Coupon Badge */}
                <div className='flex justify-center items-center'>
                    <CouponBadge />
                </div>

                {/* Second Product */}
                <div className='flex flex-col items-center'>
                    <Image src={Products[1].img} alt={Products[1].title} className='h-[350px] object-contain'/>
                    <h1 className='text-xl text-center font-bold'>{Products[1].title}</h1>
                </div>
            </div> 

            <div className='flex mt-6'>
                <p className='text-xl w-[50%]'>
                    We are redefining handbags by using soft silicone, Tyvec & Vegan leather - a unique combination of the most durable materials that exist.
                </p>
                <span className='flex mx-auto items-center'>
                    <button className='capitalize flex items-center gap-2 border border-gray-500 rounded-full px-4 py-3 hover:bg-black hover:text-white'>
                        <p>view all catalog</p>
                        <FaArrowRight size={10} />
                    </button>
                </span>
            </div>
        </div>
    </section>
  )
}

export default Catalog;
