'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/app/firebase/config' // make sure this points to your Firebase config

type User = { name: string; email: string } | null

interface AuthContextType {
  user: User
  login: (userData: { name: string; email: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  // Sync user with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split('@')[0] ||
            'User',
          email: firebaseUser.email || '',
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  // Optional: Keep localStorage for non-Firebase persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (userData: { name: string; email: string }) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = async () => {
    await signOut(auth) // log out from Firebase
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
