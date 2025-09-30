'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/cartContext'
import { SlMenu } from "react-icons/sl"
import { PiHandbagBold } from "react-icons/pi"
import { RiPokerHeartsLine } from "react-icons/ri"
import { MdOutlinePerson, MdClose } from "react-icons/md"
import { IoCartOutline } from "react-icons/io5"
import { FiUser, FiPackage, FiSettings, FiLogOut, FiHome, FiShoppingBag, FiHeart, FiStar, FiGrid, FiLayers } from "react-icons/fi"
import { RiQuestionAnswerLine } from "react-icons/ri";
import Link from 'next/link'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before showing interactive elements
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name.split(' ').map((word: string) => word[0]).join('').toUpperCase().slice(0, 2)
  }

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId)
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' })
  //   }
  //   setIsMenuOpen(false)
  // }

  const menuItems = [
    { id: 'hero', label: 'Home', icon: FiHome, path: "/home" },
    { id: 'products', label: 'Products', icon: FiShoppingBag, path: "/products" },
    { id: 'bestselling', label: 'Best Selling', icon: FiStar, path: "/bestselling" },
    { id: 'catalog', label: 'Catalog', icon: FiGrid, path: "/catalog" },
    { id: 'collections', label: 'Collections', icon: FiLayers, path: "/collections" },
    { id: 'support', label: 'Support', icon: FiHeart, path: "/support" },
  ]

  
  if (!isMounted) {
    return (
      <section className='mx-4 my-5 '>
        <div className='flex justify-between items-center'>
          <div className='border rounded-full border-gray-500 p-2 inline-flex'>
            <SlMenu size={15} />
          </div>

          <div className='flex items-center gap-1'>
            <PiHandbagBold size={18} />
            <h1 className='text-lg font-bold'>Bagstore</h1>
          </div>

          <div className='flex gap-3 items-center'>
            <div className='border rounded-full border-gray-500 p-2 inline-flex'>
              <RiPokerHeartsLine size={15} />
            </div>
            
            <div className='relative'>
              <div className='border rounded-full border-gray-500 p-2 inline-flex'>
                <IoCartOutline size={15} />
              </div>
            </div>

            <div className='border rounded-full border-gray-500 p-2 inline-flex'>
              <MdOutlinePerson size={15} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className='mx-4 my-5 relative z-50'>
        <div className='flex justify-between items-center'>
          {/* Hamburger Menu Button */}
          <div className='relative' ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300 transition-colors'
            >
              {isMenuOpen ? <MdClose size={15} /> : <SlMenu size={15} />}
            </button>

            {/* Slide-out Menu */}
            <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } w-72`}>
              {/* Menu Header */}
              <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center gap-2'>
                  <PiHandbagBold size={24} />
                  <h2 className='text-xl font-bold'>Bagstore</h2>
                </div>
              </div>

              {/* Menu Items */}
              <div className='py-4'>
                {menuItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={`/#${item.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className='w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors'
                    >
                      <IconComponent className='mr-3' size={18} />
                      <span className='font-medium'>{item.label}</span>
                    </Link>
                  )
                })}

                {/* Divider */}
                <hr className='my-4 mx-6' />

                {/* Additional Links */}
                <Link 
                  href="/about" 
                  className='w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className='mr-3' size={18} />
                  <span className='font-medium'>About Us</span>
                </Link>

                <Link 
                  href="/contact" 
                  className='w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiHeart className='mr-3' size={18} />
                  <span className='font-medium'>Contact</span>
                </Link>
                <Link
                  href="/faqs"
                  className='w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RiQuestionAnswerLine className='mr-3' size={18} />
                  <span className='font-medium'>Faqs</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className='flex items-center gap-1'>
            <PiHandbagBold size={18} />
            <h1 className='text-lg font-bold'>Bagstore</h1>
          </div>

          {/* Right Side Icons */}
          <div className='flex gap-3 items-center relative'>
            <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
              <RiPokerHeartsLine size={15} />
            </div>
            
          <Link href="/checkout">
            <div className="relative">
              <div className="border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-white">
                <IoCartOutline size={15} />
              </div>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

            {/* User Avatar with Dropdown */}
            <div className='relative' ref={dropdownRef}>
              {user ? (
                <>
                  {/* Avatar Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold hover:bg-gray-800 transition-colors'
                  >
                    {getInitials(user.name)}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50'>
                      {/* Welcome Header */}
                      <div className='px-4 py-2 border-b border-gray-100'>
                        <p className='text-sm font-medium text-gray-900'>Welcome!</p>
                        <p className='text-xs text-gray-600 truncate'>{user.name}</p>
                      </div>

                      {/* Menu Items */}
                      <Link href="/profile" className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        <FiUser className='mr-3' size={16} />
                        My Profile
                      </Link>

                      <Link href="/orders" className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        <FiPackage className='mr-3' size={16} />
                        My Orders
                      </Link>

                      <Link href="/settings" className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        <FiSettings className='mr-3' size={16} />
                        Settings
                      </Link>

                      <hr className='my-1' />

                      <button
                        onClick={handleLogout}
                        className='w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                      >
                        <FiLogOut className='mr-3' size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/auth">
                  <div className='border rounded-full border-gray-500 p-2 inline-flex hover:bg-black hover:text-gray-300'>
                    <MdOutlinePerson size={15} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar;