'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  supabase: SupabaseClient | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  supabase: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isLoading: true,
})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supabaseInstance = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      )
      setSupabase(supabaseInstance)

      const {
        data: { subscription },
      } = supabaseInstance.auth.onAuthStateChange((_, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    if (!supabase) throw new Error('Supabase client not initialized')
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{ user, supabase, signIn, signUp, signOut, isLoading }}
    >
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
