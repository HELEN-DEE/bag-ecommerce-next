'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';

import { PiHandbag, PiHandbagBold } from "react-icons/pi";
import { RiPokerHeartsLine } from "react-icons/ri";

// images
import bagImage1 from '../../../public/main-product-images/bag-image-1.png'
import bagImage2 from '../../../public//main-product-images/bag-image-2.png'
import bagImage3 from '../../../public/main-product-images/bag-image-3.png'
import bagImage4 from '../../../public/main-product-images/bag-image-4.png'
import bagImage5 from '../../../public/main-product-images/bag-image-5.png'
import bagImage6 from '../../../public/main-product-images/bag-image-6.png'

// MEN IMAGES
import maleBagImage1 from '../../../public/men-images/male-bag-1.png'
import maleBagImage2 from '../../../public//men-images/male-bag-2.png'
import maleBagImage3 from '../../../public/men-images/male-bag-3.png'
import maleBagImage4 from '../../../public/men-images/male-bag-4.png'
import maleBagImage5 from '../../../public/men-images/male-bag-5.png'
import maleBagImage6 from '../../../public/men-images/male-bag-6.png'

// WOMEN IMAGES
import femaleBagImage1 from '../../../public/women-images/female-bag-1.png'
import femaleBagImage2 from '../../../public/women-images/female-bag-2.png'
import femaleBagImage3 from '../../../public/women-images/female-bag-3.png'
import femaleBagImage4 from '../../../public/women-images/female-bag-4.png'
import femaleBagImage5 from '../../../public/women-images/female-bag-5.png'
import femaleBagImage6 from '../../../public/women-images/female-bag-6.png'

// CHILDREN IMAGES
import childrenBagImage1 from '../../../public/children-images/children-bag-1.png'
import childrenBagImage2 from '../../../public/children-images/children-bag-2.png'
import childrenBagImage3 from '../../../public/children-images/children-bag-3.png'
import childrenBagImage4 from '../../../public/children-images/children-bag-4.png'
import childrenBagImage5 from '../../../public/children-images/children-bag-5.png'
import childrenBagImage6 from '../../../public/children-images/children-bag-6.png'

// BRAND IMAGES
import brandBagImage1 from '../../../public/brand-images/brand-bag-1.png'
import brandBagImage2 from '../../../public/brand-images/brand-bag-2.png'
import brandBagImage3 from '../../../public/brand-images/brand-bag-3.png'
import brandBagImage4 from '../../../public/brand-images/brand-bag-4.png'
import brandBagImage5 from '../../../public/brand-images/brand-bag-5.png'
import brandBagImage6 from '../../../public/brand-images/brand-bag-6.png'

// NEW IMAGES
import newBagImage1 from '../../../public/new-images/new-bag-1.png'
import newBagImage2 from '../../../public/new-images/new-bag-2.png'
import newBagImage3 from '../../../public/new-images/new-bag-3.png'
import newBagImage4 from '../../../public/new-images/new-bag-4.png'
import newBagImage5 from '../../../public/new-images/new-bag-5.png'
import newBagImage6 from '../../../public/new-images/new-bag-6.png'


const radioOptions = [
    { name: 'All collection', value: 'all' },
    { name: 'New collection', value: 'new' },
    { name: 'Popular collection', value: 'popular' }
]
const products = [
    { title: 'Hobo small', price: '$195.00 USD', image: bagImage1, category: 'all' },
    { title: 'Hobo small', price: '$199.00 USD', image: bagImage2, category: 'all' },
    { title: 'Hobo small', price: '$185.00 USD', image: bagImage3, category: 'all' },
    { title: 'Hobo small', price: '$195.00 USD', image: bagImage5, category: 'all' },
    { title: 'Hobo small', price: '$199.00 USD', image: bagImage4, category: 'all' },
    { title: 'Hobo small', price: '$200.00 USD', image: bagImage6, category: 'all' },
    // Men products
    { title: 'Hobo small', price: '$195.00 USD', image: maleBagImage1, category: 'men' },
    { title: 'Hobo small', price: '$199.00 USD', image: maleBagImage2, category: 'men' },
    { title: 'Hobo small', price: '$185.00 USD', image: maleBagImage3, category: 'men' },
    { title: 'Hobo small', price: '$195.00 USD', image: maleBagImage4, category: 'men' },
    { title: 'Hobo small', price: '$199.00 USD', image: maleBagImage5, category: 'men' },
    { title: 'Hobo small', price: '$200.00 USD', image: maleBagImage6, category: 'men' },
    // Women products
    { title: 'Hobo small', price: '$195.00 USD', image: femaleBagImage1, category: 'women' },
    { title: 'Hobo small', price: '$199.00 USD', image: femaleBagImage2, category: 'women' },
    { title: 'Hobo small', price: '$185.00 USD', image: femaleBagImage3, category: 'women' },
    { title: 'Hobo small', price: '$195.00 USD', image: femaleBagImage5, category: 'women' },
    { title: 'Hobo small', price: '$199.00 USD', image: femaleBagImage4, category: 'women' },
    { title: 'Hobo small', price: '$200.00 USD', image: femaleBagImage6, category: 'women' },
    // Children products
    { title: 'Hobo small', price: '$195.00 USD', image: childrenBagImage1, category: 'children' },
    { title: 'Hobo small', price: '$199.00 USD', image: childrenBagImage2, category: 'children' },
    { title: 'Hobo small', price: '$185.00 USD', image: childrenBagImage3, category: 'children' },
    { title: 'Hobo small', price: '$195.00 USD', image: childrenBagImage5, category: 'children' },
    { title: 'Hobo small', price: '$199.00 USD', image: childrenBagImage4, category: 'children' },
    { title: 'Hobo small', price: '$200.00 USD', image: childrenBagImage6, category: 'children' },
    // Brand products
    { title: 'Hobo small', price: '$195.00 USD', image: brandBagImage3, category: 'brand' },
    { title: 'Hobo small', price: '$199.00 USD', image: brandBagImage2, category: 'brand' },
    { title: 'Hobo small', price: '$185.00 USD', image: brandBagImage5, category: 'brand' },
    { title: 'Hobo small', price: '$195.00 USD', image: brandBagImage1, category: 'brand' },
    { title: 'Hobo small', price: '$199.00 USD', image: brandBagImage6, category: 'brand' },
    { title: 'Hobo small', price: '$200.00 USD', image: brandBagImage4, category: 'brand' },
    // New products
    { title: 'Hobo small', price: '$195.00 USD', image: newBagImage1, category: 'new' },
    { title: 'Hobo small', price: '$199.00 USD', image: newBagImage2, category: 'new' },
    { title: 'Hobo small', price: '$185.00 USD', image: newBagImage3, category: 'new' },
    { title: 'Hobo small', price: '$195.00 USD', image: newBagImage4, category: 'new' },
    { title: 'Hobo small', price: '$199.00 USD', image: newBagImage5, category: 'new' },
    { title: 'Hobo small', price: '$200.00 USD', image: newBagImage6, category: 'new' },
];

const Products = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    // Filter products based on URL parameter or selected radio option
    const filteredProducts = type
        ? products.filter((p) => p.category === type)
        : selectedOption
        ? products.filter((p) => p.category === selectedOption)
        : products;

    return (
        <section className='mx-4'>
            <div className=''>
                {/* radio buttons */}
                <div className='flex justify-between '>
                    {radioOptions.map((option, index) => (
                        <label key={index} className='flex gap-2 items-center '>
                            <input
                                type="radio"
                                name={option.name}
                                value={option.value}
                                className="w-5 h-5 appearance-none border-2 rounded-full border-gray-400 checked:bg-black"
                                checked={selectedOption === option.value}
                                onChange={() => setSelectedOption(option.value)}
                            />
                            <span className='text-3xl'>
                                {option.name}
                            </span>
                        </label>
                    ))}
                </div>

                {/* Products collection */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-4'>
                    {filteredProducts.slice(0, 6).map((product, index) => (
                        <div key={index} className='bg-[#F4F4F4] rounded-xl p-4'>
                            <div className='flex justify-between'>
                                <span>
                                    <h1 className='text-xl'>{product.title}</h1>
                                    <p className='font-bold'>{product.price}</p>
                                </span>
                                <div className="flex flex-row gap-2">
                                    <span className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
                                        <PiHandbag size={18} />
                                    </span>
                                    <span className='bg-white rounded-full w-8 h-8 flex items-center justify-center'>
                                        <RiPokerHeartsLine size={18} />
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <Image src={product.image} alt={product.title} className='h-[300px] object-contain' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
