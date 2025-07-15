'use client'

import React from 'react'
import { useCart } from '../context/cartContext'
import { SlMenu } from "react-icons/sl"
import { PiHandbagBold } from "react-icons/pi"
import { RiPokerHeartsLine } from "react-icons/ri"
import { MdOutlinePerson } from "react-icons/md"
import { IoCartOutline } from "react-icons/io5"
import Link from 'next/link'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const { cartItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <section className='mx-4 my-5'>
      <div className='flex justify-between items-center'>
        <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
          <SlMenu size={15} />
        </div>

        <div className='flex items-center gap-1'>
          <PiHandbagBold size={18} />
          <h1 className='text-lg font-bold'>Bagstore</h1>
        </div>

        <div className='flex gap-3 items-center relative'>
          <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
            <RiPokerHeartsLine size={15} />
          </div>
          <div className='relative'>
            <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
              <IoCartOutline size={15} />
            </div>
            {cartItems.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>
                {cartItems.length}
              </span>
            )}
          </div>

          <Link href="/auth">
            <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
              <MdOutlinePerson size={15} />
            </div>
          </Link>

          {/* Welcome Message */}
          {user && (
            <div className='text-sm ml-2'>
              Welcome, <span className='font-semibold'>{user.name || 'User'}</span>!
              <button className='text-red-500 ml-2' onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Navbar