import React from 'react'

import { FiSearch } from "react-icons/fi";
import path from 'path';

const buttonMain = [
  {label: 'Men', path: '/men'},
  {label: 'Women', path: '/women'},
  {label: 'Children', path: '/children'},
  {label: 'Brand', path: '/brand'},
  {label: 'New', path: '/new'},
  {label: 'Popular', path: '/popular'},
]

const buttonSecondary = [
  {label: 'About', path: '/about'},
  {label: 'FAQs', path: '/faqs'},
]

const SearchBar = () => {
  return (
    <section className='mx-4 '>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          {buttonMain.map((item, index) => (
            <div key={index} className='flex gap-2 '>
                <a href={item.path} className='bg-[#F4F4F4] md:px-4 md:py-2 px-3 py-2 text-[12px] md:text-lg rounded-2xl hover:text-white hover:bg-black'>
                  {item.label}
                </a>
            </div>
          ))}
          

          <div className='bg-[#F4F4F4] rounded-2xl flex items-center max-w-[460px] w-full '>
            <input type="search" name="" id="search" placeholder='Search...' className=' px-3 py-2 flex-grow bg-transparent outline-none '/>
            <div className='bg-white rounded-full p-2 inline-flex mx-2 hover:bg-black hover:text-white'>
              <FiSearch className='' size={15}/>
            </div>
          </div>

          {buttonSecondary.map((item, index) => (
            <div key={index} className='flex gap-2 '>
                <a href={item.path} className='bg-[#F4F4F4] md:px-4 md:py-2 px-3 py-2 text-[12px] md:text-base rounded-2xl hover:text-white hover:bg-black'>
                  {item.label}
                  
                </a>
            </div>
          ))}

          

        </div>
    </section>
  )
}

export default SearchBar