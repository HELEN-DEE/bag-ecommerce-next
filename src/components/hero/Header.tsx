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
        <section className='bg-[#F4F4F4] mt-5 mx-4 rounded-xl h-[60vh] lg:h-[75vh] overflow-hidden relative'>
            {/* Background Text */}
            <div className='uppercase absolute left-1/2 top-[70%] lg:top-[58%] -translate-x-1/2 -translate-y-0 text-[#e3e1e19c] text-[70px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-bold select-none pointer-events-none whitespace-nowrap z-10'>
                <h1>Bagstore</h1>
            </div>
            
            <div className='relative z-20'>
                <div className='flex flex-col md:flex-row justify-between py-6 md:py-10 px-4 md:px-0'>
                    {/* Left side - Heading */}
                    <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl capitalize w-full md:w-[60%] mb-4 md:mb-0'>
                        <h1 className='text-center md:text-left md:flex md:justify-center leading-tight'>
                            Best Leather bag 
                        </h1>
                        <h1 className='text-center md:text-left md:px-4 leading-tight'>
                            Collection for you
                        </h1>
                    </div>
                    
                    {/* Right side - Description and CTA */}
                    <div className='w-full md:w-[40%] mt-4 md:mt-0'>
                        <div className='flex gap-2 justify-center md:justify-start items-start px-2 md:px-0'>
                            <HiMiniArrowDownRight size={20} className='mt-1 flex-shrink-0'/>
                            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left'>
                                Discover the epitome of style and craftmanship without curated leather bag collection 
                            </p>
                        </div>
                        
                        <div className='flex justify-center md:justify-start mt-4 md:mt-4'>
                            <button
                                onClick={scrollToProducts}
                                className='capitalize text-base sm:text-lg md:text-xl flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-[#dad8d8] hover:text-white hover:!bg-black transition-colors duration-300'>
                                Start shopping
                                <HiArrowRight size={15}/>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Bottom controls */}
                <div className='flex justify-between items-end px-4 '>
                    <div className='text-xs sm:text-sm md:text-base uppercase py-4 md:py-6 ml-0 md:mr-auto md:w-[50%] md:text-center'>
                        <p>2024-</p>
                        <p>Present</p>
                    </div>
                    <div className='flex gap-2 md:mr-4'>
                        <button 
                            onClick={prevImage}
                            disabled={currentImageIndex === 0}
                            className='bg-[#e2e2e2] rounded-full p-2 sm:p-3 w-9 h-9 sm:w-10 sm:h-10 border border-[#dad8d8] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#e2e2e2] disabled:hover:text-black disabled:hover:translate-y-0'
                        >
                            <HiArrowLeft size={15} />
                        </button>
                        <button 
                            onClick={nextImage}
                            disabled={currentImageIndex === images.length - 1}
                            className='bg-white rounded-full p-2 sm:p-3 w-9 h-9 sm:w-10 sm:h-10 border border-[#dad8d8] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center hover:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:translate-y-0'
                        >   
                            <HiArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Image container with your original Image component */}
            <div className='absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-10 overflow-hidden'>
                <div className='relative w-[220px] sm:w-[280px] md:w-[380px] lg:w-[440px] h-[100vh] flex items-center justify-center'>
                    <Image 
                        key={currentImageIndex}
                        src={images[currentImageIndex]} 
                        alt={`Luxury Bag ${currentImageIndex + 1}`}
                        className='w-[240px] sm:w-[280px] md:w-[380px] lg:w-[440px] h-auto object-contain animate-slideIn'
                        style={{
                            maxHeight: '100vh',
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

export default Header