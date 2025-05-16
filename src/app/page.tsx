'use client'
import React from 'react';

import { useSearchParams } from 'next/navigation'

import Header from "../components/hero/Header";
import BrandSupport from "../components/support/BrandSupport";
import Products from "../components/products/Products";
import Support from "../components/support/Support";
import Explore from "../components/explore/Explore";
import ScrollingBanner from "../components/explore/scrollingBanner";
import BestSelling from "../components/products/BestSelling";
import Catalog from "../components/products/Catalog";
import CollectionList from "../components/products/CollectionList";


const Home = () => {
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type')

const isFilterActive = Boolean(currentType)

 return (
    <main className='flex flex-col gap-8'>
      {/* If no filter, show all homepage content */}
      {!isFilterActive && (
        <>
        

      {/* Hero Section */}
      <Header />

      {/* Brand & Product Sections */}
      <BrandSupport />
      <Products />

      {/* Support & Exploration Sections */}
      <Support />
      <Explore />

      {/* Highlights & Promotions */}
      <ScrollingBanner />
      <BestSelling />

      {/* Catalog & Collections */}
      <Catalog />
      <CollectionList />

    </>
      )}
   {/* Always render Products and Footer */}
      <Products />
      
    </main>
  )
}

export default Home
