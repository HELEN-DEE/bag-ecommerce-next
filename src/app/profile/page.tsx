'use client'

import React, { useState } from 'react'
import { useAuth } from '@/components/context/authContext'
import { useCart } from '@/components/context/cartContext'
import Link from 'next/link'
import { FaLongArrowAltLeft, FaMapMarkerAlt, FaShoppingBag, FaCreditCard } from "react-icons/fa"
import { FiUser, FiMapPin, FiMail, FiPhone, FiCalendar, FiEdit3, FiSave, FiX } from "react-icons/fi"

// Type definitions
interface User {
  id?: string
  name: string
  email: string
  phone?: string
  address?: string
  dateOfBirth?: string
  bio?: string
  joinDate?: string
}

interface Order {
  id: string
  total: number
  date: string
  items: unknown[] // Replace 'unknown' with a specific type like 'CartItem[]' if you have it
}

interface EditedUser {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  bio: string
}

interface AuthContextType {
  user: User | null
  updateUser: (userData: Partial<User>) => void
}

interface CartContextType {
  orders: Order[]
}

const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth() as unknown as AuthContextType
    const { orders } = useCart() as CartContextType
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedUser, setEditedUser] = useState<EditedUser>({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        dateOfBirth: user?.dateOfBirth || '',
        bio: user?.bio || ''
    })

    // Update editedUser when user changes (for proper state management)
    React.useEffect(() => {
        if (user) {
            setEditedUser({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                dateOfBirth: user.dateOfBirth || '',
                bio: user.bio || ''
            })
        }
    }, [user])

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto my-10 p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
                <Link href="/auth" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Login
                </Link>
            </div>
        )
    }

    const handleSave = (): void => {
        if (updateUser) {
            updateUser(editedUser)
        }
        setIsEditing(false)
    }

    const handleCancel = (): void => {
        setEditedUser({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            dateOfBirth: user.dateOfBirth || '',
            bio: user.bio || ''
        })
        setIsEditing(false)
    }

    const getInitials = (name: string): string => {
        if (!name) return 'U'
        return name.split(' ')
            .map((word: string) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const handleInputChange = (field: keyof EditedUser, value: string): void => {
        setEditedUser(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Safe calculations with proper null checks
    const totalSpent = orders?.reduce((total: number, order: Order) => total + (order.total || 0), 0) || 0
    const memberSince = user.joinDate 
        ? new Date(user.joinDate).getFullYear() 
        : new Date().getFullYear()
    const orderCount = orders?.length || 0

    return (
        <div className="max-w-4xl mx-auto my-10 p-6">
            {/* Header */}
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <FaLongArrowAltLeft className="mr-2" />
                    Back to Home
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            type="button"
                        >
                            <FiEdit3 size={16} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                type="button"
                            >
                                <FiSave size={16} />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                type="button"
                            >
                                <FiX size={16} />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
                        <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            {getInitials(user.name)}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h2>
                        <p className="text-gray-600 mb-4">{user.email}</p>
                        
                        {/* Stats */}
                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Member Since</span>
                                <span className="text-sm font-medium">{memberSince}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Orders</span>
                                <span className="text-sm font-medium">{orderCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Spent</span>
                                <span className="text-sm font-medium">${totalSpent.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link href="/orders" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                                <FaShoppingBag size={16} />
                                <span>View Orders</span>
                            </Link>
                            <Link href="/settings" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                                <FaCreditCard size={16} />
                                <span>Payment Methods</span>
                            </Link>
                            <Link href="/settings" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                                <FaMapMarkerAlt size={16} />
                                <span>Shipping Addresses</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
                        
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiUser className="inline mr-2" size={16} />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        required
                                    />
                                ) : (
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiMail className="inline mr-2" size={16} />
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        required
                                    />
                                ) : (
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiPhone className="inline mr-2" size={16} />
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={editedUser.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                        {user.phone || 'No phone number added'}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiMapPin className="inline mr-2" size={16} />
                                    Address
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editedUser.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        placeholder="Enter your address"
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-vertical"
                                    />
                                ) : (
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                        {user.address || 'No address added'}
                                    </p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FiCalendar className="inline mr-2" size={16} />
                                    Date of Birth
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        value={editedUser.dateOfBirth}
                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        max={new Date().toISOString().split('T')[0]} // Prevent future dates
                                    />
                                ) : (
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                        {user.dateOfBirth 
                                            ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) 
                                            : 'No date of birth added'
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    About Me
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editedUser.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        placeholder="Tell us about yourself"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-vertical"
                                        maxLength={500}
                                    />
                                ) : (
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                        {user.bio || 'No bio added'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage