import React from 'react'
import { PiHandbagBold } from "react-icons/pi"
import { FiTruck, FiShield, FiHeart, FiAward } from "react-icons/fi"
import Link from 'next/link'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <PiHandbagBold size={32} className="text-black" />
              <h1 className="text-3xl font-bold">Bagstore</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your premier destination for premium bags, accessories, and lifestyle essentials. 
              We believe that the right bag doesn&#39;t just carry your belongings—it carries your story.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, Bagstore emerged from a simple vision: to provide high-quality, 
              stylish bags that complement every lifestyle. What started as a small passion project 
              has grown into a trusted brand serving customers worldwide.
            </p>
            <p className="text-gray-700 mb-4">
              We carefully curate our collection to ensure each piece meets our standards for 
              quality, durability, and style. From professional briefcases to casual backpacks, 
              from elegant handbags to functional travel gear—we have something for every occasion.
            </p>
            <p className="text-gray-700">
              Our commitment goes beyond just selling bags. We&#39;re dedicated to sustainable practices, 
              ethical sourcing, and building lasting relationships with our customers.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <PiHandbagBold size={120} className="text-gray-400" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bagstore?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiAward size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Hand-selected materials and craftsmanship ensure durability and style that lasts.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiTruck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and reliable delivery worldwide with tracking and insurance included.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiShield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your privacy and security are our top priorities with encrypted transactions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiHeart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                24/7 customer support and hassle-free returns ensure your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-black text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-8 max-w-4xl mx-auto">
            To empower individuals through thoughtfully designed bags that enhance their daily lives. 
            We believe that functionality and style should never be compromised, and we&#39;re committed 
            to sustainable practices that respect our planet.
          </p>
          <Link href="/" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block">
            Shop Our Collection
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions about our products or need help with your order? We&#39;re here to help!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Contact Us
            </Link>
            <Link href="/faqs" className="border border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              View FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage