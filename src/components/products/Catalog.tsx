import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Image from 'next/image'
import CouponBadge from './couponBadge';

import bagImage1 from '../../../public/catalog-product-1.png';
import bagImage2 from '../../../public/catalog-product-2.png';

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
                    <button className='capitalize flex items-center gap-2 py-3 px-4 border border-gray-500 rounded-full  hover:bg-black hover:text-white'>
                        view all catalog
                        
                            <FaArrowRight size={10} />
                        
                    </button>
                </span>
                <p className='text-xl w-[48%]  '>
                    All our bags are stain & water resisitant. They look great, wear great and will beautifully complement your life & style.
                </p>
            </div>
            <div className='flex justify-between gap-6'>
                {Products.map((product, index) => (
                    <div className='' key={index}>
                        <Image src={product.img} alt={product.title} className='h-[350px] object-contain'/>
                        <h1 className='text-xl text-center font-bold'>{product.title}</h1>
                        <CouponBadge />
                    </div>
                    
                ))}
            </div> 
            
            <div className='flex '>
                <p className=' text-xl w-[50%]'>
                    We are redefining handbags by using soft silicone. Tyvec & Vegan leather - unique combination of the most durable material that exist.
                </p>
                <span className=' flex   mx-auto items-center pl-20'>
                    <button className='capitalize flex items-center gap-2  border border-gray-500 rounded-full px-4 py-3 hover:bg-black hover:text-white'>
                        <p>view all catalog</p>
                        <span>
                            <FaArrowRight size={10} />
                        </span>
                    </button>
                </span>
            </div>
            
        </div>
    </section>
  )
}

export default Catalog