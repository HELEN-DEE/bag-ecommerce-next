import React from 'react'
import { RiBox3Line } from "react-icons/ri";
import { CgCreditCard } from "react-icons/cg";
import { PiNumberCircleSeven } from "react-icons/pi";

const supportItems = [
  {
    icon: <RiBox3Line size={50} />,
    title: 'Express delivery',
    description: 'DHL express delivery worldwide from our bag company'
  },
  {
    icon: <CgCreditCard size={50} />,
    title: 'Payment in 3x',
    description: 'Take advantage of a purchase with 3x without fees from $100 of purchase'
  },
  {
    icon: <PiNumberCircleSeven size={50} />,
    title: 'Free returns',
    description: 'Free returns for 7 days to any order delivered in france' 
  }
]

const Support = () => {
  return (
    <section className='mx-4 my-8'>
        <div>
            <h1 className='capitalize text-4xl text-center my-8'>
              we support
            </h1>
            <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
              {supportItems.map((item,index) =>(
                <div key={index} className='text-center bg-[#F4F4F4] px-4 py-4 md:px-8 rounded-xl'>
                  <span className='flex justify-center'>
                    {item.icon}
                  </span>
                  <h3 className='uppercase text-2xl'>
                    {item.title}
                  </h3>
                  <p>
                    {item.description}
                  </p>
                </div>
              ))}
              
            </div>
        </div>
    </section>
    )
  }



export default Support