import React from 'react'

import { Heart } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { User } from 'lucide-react';
import { Menu } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';


const Navbar = () => {
  return (
    <section className='mx-4 my-5'>
        <div className='flex justify-between'>
            <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                <Menu size={15}/>
            </div>

            <div className='flex items-center gap-1'>
                <BriefcaseBusiness size={18}/>
                <h1 className='text-lg font-bold'>Bagstore</h1>
            </div>

            <div className='flex gap-4'>
                <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                    <Heart size={15}/>
                </div>
                <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                    <ShoppingBag size={15}/>
                </div>
                <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                    <User size={15}/>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Navbar