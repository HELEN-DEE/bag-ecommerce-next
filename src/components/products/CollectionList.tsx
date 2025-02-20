import React from 'react'
import Image from 'next/image'

import collectionImg1 from '../../../public/collection-image-1.png'
import collectionImg2 from '../../../public/collection-image-2.png'
import collectionImg3 from '../../../public/collection-image-3.png'

const Collection = [
    {
        img: collectionImg1,
        title: 'Cosmopolitan',
    },
    {
        img: collectionImg3,
        title: 'Chelsea',
    },
    {
        img: collectionImg2,
        title: 'City',
    },
]

const CollectionList = () => {
  return (
    <section className='mx-4'>
        <div className='flex gap-2'>
            {Collection.map((collection, index) => (
                <div key={index} className='relative my-4'>
                    <Image src={collection.img} alt='collection Image' className='w-[600px] h-full object-cover rounded-xl'/>
                    {/* Overlay */}
                    <div className='absolute inset-0 bg-black bg-opacity-40 rounded-xl'></div>

                    { /* Centered text */}
                    <h1 className='text-2xl font-semibold capitalize absolute inset-0 flex justify-center items-center text-white'>
                        {collection.title}
                    </h1>
                </div>
            ))}
        </div>
    </section>
  )
}

export default CollectionList