import React from 'react'
import Image from 'next/image'


const Header = () => {
  return (
    <section className='bg-[#F4F4F4] mt-8 mx-4  rounded-xl h-[75vh] overflow-hidden relative '>
            <div className='uppercase absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-0 text-[#e3e1e1] text-[220px] font-bold select-none pointer-events-none tracking-[0.em] whitespace-nowrap'>
                <h1>Bagstore</h1>
            </div>
        <div className='relative '>
                <div className='flex justify-between py-10'>
                    <div className='text-5xl capitalize w-[60%] '>
                        <h1 className='flex justify-center'>
                            Best Leather bag 
                        </h1>
                        <h1 className='px-4'>
                            Collection for you
                        </h1>
                    </div>
                    <div className='w-[40%]'>
                        <div className='flex gap-2'>
                            {/* <HiMiniArrowDownRight size={25} /> */}
                            <p>
                                Discover the epitome of style and craftmanship without curated leather bag collection 
                            </p>
                        </div>
                        <button className='capitalize flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-[#dad8d8]'>
                            Start shopping
                            {/* <HiArrowRight size={15} className=''/> */}
                        </button>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='text-base w-[50%] mx-auto uppercase py-6'>
                        <p>2024-</p>
                        <p>Present</p>
                    </div>
                    <button className='flex gap-2 mx-4'>
                        <div className='bg-[#e2e2e2] rounded-full p-3 border border-[#dad8d8]'>
                            {/* <HiArrowLeft size={15} /> */}
                        </div>
                        <div className='bg-white rounded-full p-3 border border-[#dad8d8]'>   
                            {/* <HiArrowRight size={15} /> */}
                        </div>
                    </button>
                </div>
            <div className='absolute top-0 left-0 right-0 flex justify-center '>
                {/* <Image src={headerImg} alt="Luxury Bag" className='w-[440px]' /> */}
            </div>
        </div>
    </section>
  )
}

export default Header