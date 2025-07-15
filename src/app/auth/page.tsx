"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/context/authContext'

const AuthPage = () => {
  const router = useRouter()
  const { user, login } = useAuth()

  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Reset error on new submission

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    if (tab === 'signup' && !name) {
      setError('Name is required for sign up')
      return
    }

    // For demo purposes - in a real app, you would call your API here
    const userData = { 
      name: tab === 'signup' ? name : email.split('@')[0], // Use email prefix if name not provided
      email 
    }
    
    login(userData)
    router.push('/')
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-gray-100 shadow-md p-6 rounded-md w-full max-w-md">
        {/* Tabs */}
        <div className="flex justify-between mb-4 border-b">
          <button
            type="button"
            className={`w-1/2 py-2 font-semibold ${tab === 'signin' ? 'border-b-2 border-black' : 'text-gray-400'}`}
            onClick={() => setTab('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 font-semibold ${tab === 'signup' ? 'border-b-2 border-black' : 'text-gray-400'}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full border px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={tab === 'signup'}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {tab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage