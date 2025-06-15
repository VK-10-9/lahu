"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "@/lib/types"
import { getCurrentUser, setCurrentUser, saveUser, findUserByEmail, generateId } from "@/lib/auth"
import { initializeSampleData } from "@/lib/database"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (userData: any) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeSampleData()
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const existingUser = findUserByEmail(email)
      if (!existingUser) {
        setIsLoading(false)
        return { success: false, error: "User not found" }
      }

      // In a real app, you'd verify the password
      if (password.length < 6) {
        setIsLoading(false)
        return { success: false, error: "Invalid credentials" }
      }

      setUser(existingUser)
      setCurrentUser(existingUser)
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Sign in failed" }
    }
  }

  const signUp = async (userData: any) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const existingUser = findUserByEmail(userData.email)
      if (existingUser) {
        setIsLoading(false)
        return { success: false, error: "Email already registered" }
      }

      const newUser: User = {
        id: generateId(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        bloodGroup: userData.bloodGroup,
        location: userData.location || "",
        lastDonation: userData.lastDonation || null,
        totalDonations: 0,
        role: userData.role,
        isAvailable: true,
        createdAt: new Date().toISOString(),
      }

      saveUser(newUser)
      setUser(newUser)
      setCurrentUser(newUser)
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Sign up failed" }
    }
  }

  const signOut = () => {
    setUser(null)
    setCurrentUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    setCurrentUser(updatedUser)
    saveUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
