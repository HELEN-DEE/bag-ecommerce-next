import React from 'react'
import Image from 'next/image'
import brownBag from '../../../public/brown-bag.png';
import blueBag from '../../../public/blue-bag.png';

const scrollingText = [
    {
        img: brownBag,
        text: 'Get 20% off coupon "BAG20"',
    },
    {
        img: blueBag,
        text: 'Get 20% off coupon "BAG20"',
    }
]

const ScrollingBanner = () => {
  return (
    <section className='mx-4 my-8 rounded-xl'>
        <div className='relative overflow-hidden bg-[#f4f4f4] py-4 rounded-xl'>
            {/* right duplicate scrolling line */}
            <div className="flex whitespace-nowrap animate-scroll-right">
                {Array(3).fill(scrollingText).flat().map((item, index) => (
                    <div key={`line1-${index}`} className='flex items-center mx-4 '>   
                        <Image src={item.img} alt="bag-img" className='w-12 h-auto'/>
                        <span className='uppercase text-2xl  p-2 text-gray-400'>
                        {item.text}
                        </span>
                    </div>
            ))}
            </div>

        {/* left duplicate scrolling line */}
        <div className="flex whitespace-nowrap animate-scroll-left">
                {Array(3).fill(scrollingText).flat().map((item, index) => (
                    <div key={`line2-${index}`} className='flex items-center mx-4 '>   
                        
                        
                        <Image src={item.img} alt="bag-img" className='w-12 h-auto '/>
                        <span className='uppercase text-2xl  p-2 text-gray-400'>
                        {item.text}
                        </span>
                    </div>
            ))}
            </div>
        </div>
    </section>
  )
}

export default ScrollingBanner