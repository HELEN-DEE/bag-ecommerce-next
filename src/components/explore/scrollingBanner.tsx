"use client";

import Image, { StaticImageData } from 'next/image';
import brownBag from '../../../public/banner-images/brown-bag.png';
import blueBag from '../../../public/banner-images/blue-bag.png';

interface ScrollingItem {
    img: StaticImageData;
    text: string;
}

const scrollingText: ScrollingItem[] = [
    {
        img: brownBag,
        text: 'Get 20% off coupon "BAG20"',
    },
    {
        img: blueBag,
        text: 'Get 20% off coupon "BAG20"',
    }
];

const ScrollingBanner: React.FC = () => {
  return (
    <section className='mx-4 my-8 rounded-xl'>
      <div className='relative overflow-hidden bg-[#f4f4f4] py-4 rounded-xl '>
        {/* Right to left scrolling line */}
        <div className="flex whitespace-nowrap animate-scroll-left-slow">
          {Array(3).fill(scrollingText).flat().map((item, index) => (
            <div key={`line1-${index}`} className='flex items-center mx-6'>
              <Image src={item.img} alt="bag-img" className='w-20 h-auto'/>
              <span className='uppercase text-5xl p-2 text-gray-400'>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Left to right scrolling line */}
        <div className="flex whitespace-nowrap animate-scroll-right-slow mt-4">
          {Array(3).fill(scrollingText).flat().map((item, index) => (
            <div key={`line2-${index}`} className='flex items-center mx-6'>
              <Image src={item.img} alt="bag-img" className='w-20 h-auto'/>
              <span className='uppercase text-5xl p-2 text-gray-400'>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left-slow {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }

        @keyframes scroll-right-slow {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        .animate-scroll-left-slow {
          animation: scroll-left-slow 20s linear infinite;
        }

        .animate-scroll-right-slow {
          animation: scroll-right-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ScrollingBanner;
