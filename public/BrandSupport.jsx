import React from 'react'
import nikeLogo from '../assets/nike-logo.png'
import etsyLogo from '../assets/etsy-logo.png'
import reebokLogo from '../assets/reebok-logo.png'
import pumaLogo from '../assets/puma-logo.png'
import asosLogo from '../assets/asos-logo.png'
import ebayLogo from '../assets/ebay-logo.png'
import zaraLogo from '../assets/zara-logo.png'
import adidasLogo from '../assets/adidas-logo.png'

const logo = [
    {src: nikeLogo, alt: 'nikeLogo'},
    {src: etsyLogo, alt: 'etsyLogo'},
    {src: reebokLogo, alt: 'reebokLogo'},
    {src: pumaLogo, alt: 'pumaLogo'},
    {src: asosLogo, alt: 'asosLogo'},
    {src: ebayLogo, alt: 'ebayLogo'},
    {src: zaraLogo, alt: 'zaraLogo'},
    {src: adidasLogo, alt: 'adidasLogo'},

]

const BrandSupport = () => {
  return (
    <section className='mx-4'>
        <div className='text-center py-4'>
            <h1 className='text-4xl capitalize my-8'>
                We are supported by
            </h1>
            <div className='grid grid-cols-2  lg:grid-cols-4 gap-2 justify-items-center  '>
                {logo.map((logo,index) => (
                    <div key={index} className='bg-[#F4F4F4] px-16 py-2 flex justify-center items-center rounded-xl'>
                        <img src={logo.src} alt={logo.alt} className='lg:w-[80%]'/>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default BrandSupport