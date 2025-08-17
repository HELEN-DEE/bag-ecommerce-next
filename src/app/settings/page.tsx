'use client'

import React, { useState } from 'react'
import { useAuth } from '@/components/context/authContext'
import Link from 'next/link'
import { FaLongArrowAltLeft, FaCreditCard, FaMapMarkerAlt, FaBell, FaShield, FaEye, FaEyeSlash, FaTrash, FaPlus } from "react-icons/fa"
import { FiSave, FiEdit3, FiX, FiCheck } from "react-icons/fi"

const SettingsPage = () => {
    const { user, updateUser, logout } = useAuth()
    const [activeTab, setActiveTab] = useState('account')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    // Account Settings State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    // Notification Settings State
    const [notifications, setNotifications] = useState({
        emailOrders: true,
        emailPromotions: false,
        emailNewsletter: true,
        pushOrders: true,
        pushPromotions: false,
        smsOrders: false
    })

    // Privacy Settings State
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'friends',
        showEmail: false,
        showPhone: false,
        dataSharing: false,
        analytics: true
    })

    // Payment Methods State
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false }
    ])

    // Shipping Addresses State
    const [addresses, setAddresses] = useState([
        { 
            id: 1, 
            name: 'Home', 
            address: '123 Main St, Lagos, NG 100001', 
            isDefault: true 
        },
        { 
            id: 2, 
            name: 'Work', 
            address: '456 Business Ave, Lagos, NG 101245', 
            isDefault: false 
        }
    ])

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto my-10 p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Please log in to access settings</h1>
                <Link href="/auth" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Login
                </Link>
            </div>
        )
    }

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        // Handle password update logic here
        alert('Password updated successfully!')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Handle account deletion logic here
            logout()
            alert('Account deleted successfully')
        }
    }

    const tabs = [
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'privacy', label: 'Privacy', icon: '🔒' },
        { id: 'payment', label: 'Payment', icon: '💳' },
        { id: 'shipping', label: 'Shipping', icon: '📦' }
    ]

    return (
        <div className="max-w-6xl mx-auto my-10 p-6">
            {/* Header */}
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <FaLongArrowAltLeft className="mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-black text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                        
                        {/* Account Settings */}
                        {activeTab === 'account' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                                
                                {/* Change Password */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                                    <form onSubmit={handlePasswordChange} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showCurrentPassword ? 'text' : 'password'}
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    className="absolute right-3 top-2.5 text-gray-500"
                                                >
                                                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-2.5 text-gray-500"
                                                >
                                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-2.5 text-gray-500"
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                            Update Password
                                        </button>
                                    </form>
                                </div>

                                {/* Danger Zone */}
                                <div className="border-t border-gray-200 pt-8">
                                    <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                                        <p className="text-sm text-red-700 mb-4">
                                            This will permanently delete your account and all associated data. This action cannot be undone.
                                        </p>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'emailOrders', label: 'Order confirmations and updates' },
                                                { key: 'emailPromotions', label: 'Promotional offers and discounts' },
                                                { key: 'emailNewsletter', label: 'Weekly newsletter' }
                                            ].map((item) => (
                                                <label key={item.key} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications[item.key as keyof typeof notifications]}
                                                        onChange={(e) => setNotifications({
                                                            ...notifications,
                                                            [item.key]: e.target.checked
                                                        })}
                                                        className="rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <span className="ml-2 text-gray-700">{item.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'pushOrders', label: 'Order status updates' },
                                                { key: 'pushPromotions', label: 'Special offers' }
                                            ].map((item) => (
                                                <label key={item.key} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications[item.key as keyof typeof notifications]}
                                                        onChange={(e) => setNotifications({
                                                            ...notifications,
                                                            [item.key]: e.target.checked
                                                        })}
                                                        className="rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <span className="ml-2 text-gray-700">{item.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.smsOrders}
                                                    onChange={(e) => setNotifications({
                                                        ...notifications,
                                                        smsOrders: e.target.checked
                                                    })}
                                                    className="rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <span className="ml-2 text-gray-700">Order confirmations via SMS</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy */}
                        {activeTab === 'privacy' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                                        <select
                                            value={privacy.profileVisibility}
                                            onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        >
                                            <option value="public">Public</option>
                                            <option value="friends">Friends Only</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Contact Information</h3>
                                        {[
                                            { key: 'showEmail', label: 'Show email address in profile' },
                                            { key: 'showPhone', label: 'Show phone number in profile' }
                                        ].map((item) => (
                                            <label key={item.key} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={privacy[item.key as keyof typeof privacy]}
                                                    onChange={(e) => setPrivacy({
                                                        ...privacy,
                                                        [item.key]: e.target.checked
                                                    })}
                                                    className="rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <span className="ml-2 text-gray-700">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Data & Analytics</h3>
                                        {[
                                            { key: 'dataSharing', label: 'Allow data sharing with partners' },
                                            { key: 'analytics', label: 'Help improve our service with usage analytics' }
                                        ].map((item) => (
                                            <label key={item.key} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={privacy[item.key as keyof typeof privacy]}
                                                    onChange={(e) => setPrivacy({
                                                        ...privacy,
                                                        [item.key]: e.target.checked
                                                    })}
                                                    className="rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <span className="ml-2 text-gray-700">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Methods */}
                        {activeTab === 'payment' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
                                
                                <div className="space-y-4 mb-6">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                                                    {method.type}
                                                </div>
                                                <div>
                                                    <p className="font-medium">•••• •••• •••• {method.last4}</p>
                                                    <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                                                </div>
                                                {method.isDefault && (
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-gray-600 hover:text-gray-800">
                                                    <FiEdit3 size={16} />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                    <FaPlus size={16} />
                                    Add Payment Method
                                </button>
                            </div>
                        )}

                        {/* Shipping Addresses */}
                        {activeTab === 'shipping' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Shipping Addresses</h2>
                                
                                <div className="space-y-4 mb-6">
                                    {addresses.map((address) => (
                                        <div key={address.id} className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium">{address.name}</h3>
                                                    {address.isDefault && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600">{address.address}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-gray-600 hover:text-gray-800">
                                                    <FiEdit3 size={16} />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                    <FaPlus size={16} />
                                    Add New Address
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage