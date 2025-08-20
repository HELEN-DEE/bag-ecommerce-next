import React, { useState } from 'react'
import Image from 'next/image'
import headerImg from '../../../public/hero-image/luxury-bag.png'
import headerImg3 from '../../../public/hero-image/luxury-bag-3.png'
import headerImg4 from '../../../public/hero-image/luxury-bag-4.png'

import { HiMiniArrowDownRight, HiArrowRight, HiArrowLeft } from "react-icons/hi2";

const Header = () => {
    // Array of images 
    const images = [
        headerImg,
        headerImg3,
        headerImg4,

    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const scrollToProducts = () => {
        const productsSection = document.getElementById('products')
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

     return (
        <section className='bg-[#F4F4F4] mt-5 mx-4 rounded-xl h-[75vh] overflow-hidden relative'>
            <div className='uppercase absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-0 text-[#e3e1e19c] text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] font-bold select-none pointer-events-none whitespace-nowrap z-10'>
                <h1>Bagstore</h1>
            </div>
            
            <div className='relative z-20'>
                <div className='flex flex-col md:flex-row justify-between py-10'>
                    <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize w-full md:w-[60%] mb-6 md:mb-0'>
                        <h1 className='flex justify-center'>
                            Best Leather bag 
                        </h1>
                        <h1 className='px-4'>
                            Collection for you
                        </h1>
                    </div>
                    <div className='w-full md:w-[40%]'>
                        <div className='flex gap-2 justify-center md:justify-start'>
                            <HiMiniArrowDownRight size={25}/>
                            <p className='text-lg md:text-xl'>
                                Discover the epitome of style and craftmanship without curated leather bag collection 
                            </p>
                        </div>
                        
                        <div className='flex justify-center md:justify-start'>
                            <button
                                onClick={scrollToProducts}
                                className='capitalize text-lg md:text-xl flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-[#dad8d8] mt-4 hover:text-white hover:!bg-black transition-colors duration-300'>
                                Start shopping
                                <HiArrowRight size={15}/>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className='flex justify-between'>
                    <div className='text-sm md:text-base w-[50%] mx-auto uppercase py-6'>
                        <p>2024-</p>
                        <p>Present</p>
                    </div>
                    <div className='flex gap-2 mx-4'>
                        <button 
                            onClick={prevImage}
                            className='bg-[#e2e2e2] rounded-full p-3 w-10 h-10 border border-[#dad8d8] hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center'
                        >
                            <HiArrowLeft size={15} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className='bg-white rounded-full p-3 w-10 h-10 border border-[#dad8d8] hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify-center'
                        >   
                            <HiArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Image container with consistent sizing and positioning */}
            <div className='absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-10'>
                <div className='relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-[100vh] flex items-center justify-center'>
                    <Image 
                        src={images[currentImageIndex]} 
                        alt={`Luxury Bag ${currentImageIndex + 1}`}
                        className='w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-auto object-contain transition-opacity duration-500'
                        style={{
                            maxHeight: '100vh',
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default Header