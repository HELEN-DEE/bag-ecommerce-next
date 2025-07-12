'use client'

import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  return { user, logout }
}
