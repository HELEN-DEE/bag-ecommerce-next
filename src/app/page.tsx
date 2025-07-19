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
  const searchQuery = searchParams.get('search')
  const isFilterActive = Boolean(currentType || searchQuery)

  return (
    <main className='flex flex-col gap-8'>
      {/* If no filter, show full homepage content */}
      {!isFilterActive ? (
        <>
          {/* Hero Section */}
          <section id="hero">
            <Header />
          </section>

          {/* Brand & Product Sections */}
          <BrandSupport />
          
          <section id="products">
            <Products />
          </section>

          {/* Support & Exploration Sections */}
          <section id="support">
            <Support />
          </section>
          
          <Explore />

          {/* Highlights & Promotions */}
          <ScrollingBanner />
          
          <section id="bestselling">
            <BestSelling />
          </section>

          {/* Catalog & Collections */}
          <section id="catalog">
            <Catalog />
          </section>
          
          <section id="collections">
            <CollectionList />
          </section>
        </>
      ) : (
        // If filter is active, show only filtered products
        <Products />
      )}
    </main>
  )
}

export default Home