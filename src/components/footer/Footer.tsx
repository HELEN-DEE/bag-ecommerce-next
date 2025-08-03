"use client"

import { useSearchParams, useRouter } from 'next/navigation';

import React from 'react'
import Image from 'next/image'

import { HiArrowRight, HiArrowUp } from "react-icons/hi2";


import VisaLogo from '../../../public/footer-images/Visa.png'
import MasterCardLogo from '../../../public/footer-images/Mastercard.png'
import PayPalLogo from '../../../public/footer-images/paypal.png'


import { RiTwitterXFill, RiInstagramLine, RiLinkedinBoxLine } from "react-icons/ri";


const menuLinks = [
    {name: 'Men', link: '/men'},
    {name: 'Women', link: '/women'},
    {name: 'Children', link: '/children'},
    {name: 'Brand', link: '/brand'},
    {name: 'New', link: '/new'},
    {name: 'Popular', link: '/popular'}
]

const supportlinks = [
    {name: 'Shipping & Returns', link: '/shipping-returns'},
    {name: 'FAQs', link: '/faqs'},
    {name: 'Help & Conditions', link: '/help-conditions'},
    {name: 'About', link: '/about'},
    {name: 'Contact', link: '/contact'},
    
]

const logoImage = [
    {image: MasterCardLogo, alt: 'MasterCard Logo'},
    {image: PayPalLogo, alt: 'PayPal Logo'},
    {image: VisaLogo, alt: 'Visa Logo'},
]

const appIcons = [
    {icon: RiInstagramLine, link: '/instagram'},
    {icon: RiTwitterXFill, link: '/twitter'},
    {icon: RiLinkedinBoxLine, link: '/linkedin'}
]

const Footer = () => {
    const searchParams = useSearchParams();
const router = useRouter();
const currentType = searchParams.get("type");

const handleFilter = (type: string) => {
const params = new URLSearchParams(searchParams.toString());
    if (type === currentType) {
    params.delete("type");
    } else {
    params.set("type", type);
    }
    router.push(`/?${params.toString()}`);
};
return (
    <section className='mx-4 my-8 bg-[#F4F4F4] rounded-2xl'>
        <div className='p-6'>
            <div className='flex '>
                <div className='lg:w-[50%]'>
                    <h1 className='uppercase text-xl w-[65%] pb-5'>
                        suscribe to our newsletter and be the first to know about our latest releases, offers and news from bagstore.com
                    </h1>
                    <span className='flex justify-between border px-6 py-2 rounded-full w-[60%] '>
                        <input type="email" name="email" id="email" placeholder='Enter your email here' className='  bg-transparent  focus:outline-none text-lg'/>
                        <button>
                            <HiArrowRight size={20} />
                        </button>
                    </span>
                    <span className='flex gap-2 pt-3 items-center'>
                        <input type="radio" name="" id="" className='w-5 h-5 appearance-none border-2 rounded-full border-gray-400 checked:bg-black '/>
                        <label htmlFor="">I have read and agree to the bagstore privacy policy</label>
                    </span>
                    
                </div>
                <div className='flex  justify-between w-[30%]'>
                    <div>
                        <h1 className='capitalize text-2xl'>
                            Menu
                        </h1>
                        <ul>
                            {menuLinks.map((menu, index) => (
                                <li key={index}>
                                    <button
                                    onClick={() => handleFilter(menu.name.toLowerCase())}
                                    className="hover:underline text-left"
                                    >
                                    {menu.name}
                                    </button>
                                </li>
                            ))}
                        </ul>   
                    </div>
                    <div>
                        <h1 className='capitalize text-2xl'>
                            Support
                        </h1>
                        <ul>
                            {supportlinks.map((support, index) => (
                                <li key={index}>
                                    <a href={support.link}>{support.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
            <div className='flex justify-between pt-6 items-center'>
                <div className='flex items-center'>
                    {logoImage.map((logo, index) => (
                        <div key={index}>
                            <Image src={logo.image} alt={logo.alt}  className='w-16'/>
                        </div>
                    ))}
                </div>
                <div className='flex gap-3'>
                    {appIcons.map((app, index) => (
                        <div key={index}>
                            <a href={app.link}>
                                <app.icon size={20} />
                            </a>
                        </div>
                    ))}
                </div>
                <div>
                    <button className='flex items-center gap-2 bg-[#ffffff] px-4 py-3 rounded-2xl border border-gray-400 hover:bg-black hover:text-white transition-colors'>
                        Back to top
                        <HiArrowUp size={15} />
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer