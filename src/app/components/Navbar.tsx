import React from 'react'
// import { SlMenu } from "react-icons/sl";
// import { PiHandbagBold } from "react-icons/pi";
// import { RiPokerHeartsLine } from "react-icons/ri";
// import { MdOutlinePerson } from "react-icons/md";
// import { HiShoppingBag } from "react-icons/hi";
import { Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <section className='mx-4 my-5'>
        <div className='flex justify-between'>
            <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                {/* <SlMenu className='' size={15}/> */}
            </div>

            <div className='flex items-center'>
                {/* <HiShoppingBag size={20}/> */}
                <h1 className='text-lg font-bold'>Bagstore</h1>
            </div>

            <div className='flex gap-4'>
                <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                <Heart />
                </div>
                <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                    {/* <PiHandbagBold size={15}/> */}
                </div>
                <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                    {/* <MdOutlinePerson size={15}/> */}
                </div>

            </div>
        </div>
    </section>
  )
}

export default Navbar