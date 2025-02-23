import React from 'react'

import { HiArrowRight } from "react-icons/hi2";

const Footer = () => {
  return (
    <section className='mx-4 my-8'>
        <div>
            <div>
                <h1 className='uppercase text-2xl w-[38%] '>
                    suscribe to our newsletter and be the first to know about our latest releases, offers and news from bagstore.com
                </h1>
                <span className='flex justify-between border px-3 py-2 rounded-full w-[30%]'>
                    <input type="email" name="email" id="email" placeholder='Enter your email here' className='  '/>
                    <button>
                        <HiArrowRight size={15} />
                    </button>
                </span>
                <span className='flex gap-2'>
                    <input type="radio" name="" id="" />
                    <label htmlFor="">I have read and agree to the bagstore privacy policy</label>
                </span>
            </div>
            <div>

            </div>
        </div>
    </section>
  )
}

export default Footer