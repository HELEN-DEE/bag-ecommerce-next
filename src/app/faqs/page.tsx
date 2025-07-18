"use client"
import React, { useState } from 'react'
import { FiPlus, FiMinus, FiSearch } from "react-icons/fi"
import Link from 'next/link'

const FAQsPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      id: 1,
      category: "Ordering",
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to provide your shipping information and payment details to complete your purchase."
    },
    {
      id: 2,
      category: "Ordering",
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. After that, if your order hasn't shipped yet, please contact our customer service team and we'll do our best to help you."
    },
    {
      id: 3,
      category: "Shipping",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. International shipping may take 10-15 business days depending on your location."
    },
    {
      id: 4,
      category: "Shipping",
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by destination. You can see the exact shipping cost at checkout before completing your order."
    },
    {
      id: 5,
      category: "Shipping",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
    },
    {
      id: 6,
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition. Items must be unused, with tags attached, and in original packaging. Return shipping is free for defective items."
    },
    {
      id: 7,
      category: "Returns",
      question: "How do I return an item?",
      answer: "To return an item, log into your account, go to 'My Orders', select the item you want to return, and follow the instructions. You'll receive a prepaid return label via email."
    },
    {
      id: 8,
      category: "Returns",
      question: "When will I receive my refund?",
      answer: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method."
    },
    {
      id: 9,
      category: "Products",
      question: "Are your bags genuine leather?",
      answer: "We offer both genuine leather and high-quality synthetic options. Each product page clearly indicates the material used. All our leather products are ethically sourced."
    },
    {
      id: 10,
      category: "Products",
      question: "How do I care for my bag?",
      answer: "Care instructions vary by material. For leather bags, use a leather conditioner every 3-6 months. For fabric bags, spot clean with mild soap. Detailed care instructions are included with each purchase."
    },
    {
      id: 11,
      category: "Products",
      question: "Do you offer warranties on your products?",
      answer: "Yes, all our products come with a 1-year warranty against manufacturing defects. This doesn't cover normal wear and tear or damage from misuse."
    },
    {
      id: 12,
      category: "Account",
      question: "Do I need to create an account to shop?",
      answer: "While you can shop as a guest, creating an account allows you to track orders, save favorites, and enjoy faster checkout for future purchases."
    },
    {
      id: 13,
      category: "Account",
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password."
    },
    {
      id: 14,
      category: "Payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
    },
    {
      id: 15,
      category: "Payment",
      question: "Is it safe to shop on your website?",
      answer: "Absolutely! We use SSL encryption to protect your personal and payment information. Your data is never stored on our servers and all transactions are processed securely."
    }
  ]

  const categories = [...new Set(faqs.map(faq => faq.category))]

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSearchTerm('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              searchTerm === '' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSearchTerm(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                searchTerm === category ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-4">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {faq.question}
                  </h3>
                </div>
                {openFAQ === faq.id ? (
                  <FiMinus className="text-gray-400 flex-shrink-0" size={20} />
                ) : (
                  <FiPlus className="text-gray-400 flex-shrink-0" size={20} />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No FAQs found matching your search. Try a different term or browse all categories.
            </p>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">
            Can&#39;t find what you&#39;re looking for? Our customer service team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Contact Support
            </Link>
            <Link href="/" className="border border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQsPage