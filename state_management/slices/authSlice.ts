import { signOut } from 'next-auth/react'
import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'

interface Auth {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthState {
  auth: Auth | null
  authStatus: 'loading' | 'authenticated' | 'unauthenticated'
}

export type AuthActions = {
  logout: () => void
  setAuth: (auth: AuthState['auth']) => void
  setAuthStatus: (authStatus: AuthState['authStatus']) => void
}

export type AuthSlice = AuthState & AuthActions

export const initialAuthState: AuthState = {
  auth: null,
  authStatus: 'unauthenticated',
}

export const createAuthSlice: StateCreator<Store, [], [], AuthSlice> = (
  set
) => ({
  ...initialAuthState,
  setAuth: (auth: AuthState['auth']) =>
    set((state) => {
      return { ...state, auth }
    }),

  logout: async () =>
    set((state) => {
      signOut({ redirectTo: '/login' })
      return { ...state, auth: null }
    }),

  setAuthStatus: async (authStatus: AuthState['authStatus']) =>
    set((state) => {
      return { ...state, authStatus }
    }),
})
