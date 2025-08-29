"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/context/authContext'
import { auth } from '@/app/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { toast } from 'sonner'

const AuthPage = () => {
  const router = useRouter()
  const { login } = useAuth()

  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    if (tab === "signup" && !name) {
      setError("Name is required for sign up")
      return
    }

    try {
      if (tab === "signup") {
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        // Set displayName in Firebase
        await updateProfile(userCredential.user, {
          displayName: name,
        })

        // Update local context
        login({ name, email })

        toast.success(`Account created successfully! 🎉`)
      } else {
        // Sign in user
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        
        // Get displayName from Firebase
        const displayName =
          userCredential.user.displayName || email.split('@')[0]
        
        login({ name: displayName, email })

        toast.success(`Welcome back, ${displayName}! 👋`)
      }

      // Redirect after toast
      setTimeout(() => {
        router.push("/")
      }, 1000)

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Something went wrong")
      }
    }
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
