'use client'

import React, { useState } from 'react'
import { useAuth } from '@/components/context/authContext'
import { useCart } from '@/components/context/cartContext'
import Link from 'next/link'
import { FaLongArrowAltLeft, FaMapMarkerAlt, FaShoppingBag, FaCreditCard } from 'react-icons/fa'
import { FiUser, FiMapPin, FiMail, FiPhone, FiCalendar, FiEdit3, FiSave, FiX } from 'react-icons/fi'

// Type definitions
interface User {
  name: string
  email: string
  phone?: string
  address?: string
  dateOfBirth?: string
  bio?: string
  joinDate?: string
}

interface Order {
  total: number
}

interface EditedUser {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  bio: string
}

// Reusable form field component
interface FormFieldProps {
  label: string
  icon: React.ReactNode
  value: string
  onChange?: (value: string) => void
  isEditing: boolean
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea'
  placeholder?: string
  rows?: number
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  icon,
  value,
  onChange,
  isEditing,
  type = 'text',
  placeholder,
  rows = 3,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {icon}
      {label}
    </label>
    {isEditing ? (
      type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      )
    ) : (
      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
        {value || `No ${label.toLowerCase()} added`}
      </p>
    )}
  </div>
)

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth()
  const { orders } = useCart()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<EditedUser>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    bio: user?.bio || '',
  })
  const [error, setError] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
        <Link
          href="/auth"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Login
        </Link>
      </div>
    )
  }

  const handleSave = async () => {
    try {
      await updateUser(editedUser)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      setError('Failed to update profile. Please try again.')
    }
  }

  const handleCancel = () => {
    setEditedUser({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '',
      bio: user.bio || '',
    })
    setIsEditing(false)
    setError(null)
  }

  const getInitials = (name: string): string =>
    name ? name.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2) : 'U'

  const totalSpent = orders.reduce((total: number, order: Order) => total + (order.total || 0), 0)
  const memberSince = user.joinDate ? new Date(user.joinDate).getFullYear() : new Date().getFullYear()

  return (
    <div className="max-w-4xl mx-auto my-10 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
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
              aria-label="Edit Profile"
            >
              <FiEdit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                aria-label="Save Profile"
              >
                <FiSave size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                aria-label="Cancel Editing"
              >
                <FiX size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
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
                <span className="text-sm font-medium">{orders.length}</span>
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
              <Link
                href="/orders"
                className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors"
              >
                <FaShoppingBag size={16} />
                <span>View Orders</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors"
              >
                <FaCreditCard size={16} />
                <span>Payment Methods</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors"
              >
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
              <FormField
                label="Full Name"
                icon={<FiUser className="inline mr-2" size={16} />}
                value={editedUser.name}
                onChange={(value) => setEditedUser({ ...editedUser, name: value })}
                isEditing={isEditing}
                type="text"
              />
              <FormField
                label="Email Address"
                icon={<FiMail className="inline mr-2" size={16} />}
                value={editedUser.email}
                onChange={(value) => setEditedUser({ ...editedUser, email: value })}
                isEditing={isEditing}
                type="email"
              />
              <FormField
                label="Phone Number"
                icon={<FiPhone className="inline mr-2" size={16} />}
                value={editedUser.phone}
                onChange={(value) => setEditedUser({ ...editedUser, phone: value })}
                isEditing={isEditing}
                type="tel"
                placeholder="Enter your phone number"
              />
              <FormField
                label="Address"
                icon={<FiMapPin className="inline mr-2" size={16} />}
                value={editedUser.address}
                onChange={(value) => setEditedUser({ ...editedUser, address: value })}
                isEditing={isEditing}
                type="textarea"
                placeholder="Enter your address"
                rows={3}
              />
              <FormField
                label="Date of Birth"
                icon={<FiCalendar className="inline mr-2" size={16} />}
                value={editedUser.dateOfBirth}
                onChange={(value) => setEditedUser({ ...editedUser, dateOfBirth: value })}
                isEditing={isEditing}
                type="date"
              />
              <FormField
                label="About Me"
                icon={null}
                value={editedUser.bio}
                onChange={(value) => setEditedUser({ ...editedUser, bio: value })}
                isEditing={isEditing}
                type="textarea"
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage