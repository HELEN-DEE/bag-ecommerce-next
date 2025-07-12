'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
    const router = useRouter()

    const [tab, setTab] = useState<'signin' | 'signup'>('signin')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  // Redirect if already logged in
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) router.push('/')
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    const user = { name, email }

    // Store in localStorage (mock login)
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/')
}

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md">
            {/* Tabs */}
            <div className="flex justify-between mb-4 border-b">
                <button
                    className={`w-1/2 py-2 font-semibold ${tab === 'signin' ? 'border-b-2 border-black' : 'text-gray-400'}`}
                    onClick={() => setTab('signin')}
                >
                    Sign In
                </button>
                <button
                className={`w-1/2 py-2 font-semibold ${tab === 'signup' ? 'border-b-2 border-black' : 'text-gray-400'}`}
                onClick={() => setTab('signup')}
                >
                    Sign Up
                </button>
        </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'signup' && (
                <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border px-3 py-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-black text-white py-2 rounded">
                    {tab === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    </div>
    )
}

export default AuthPage
