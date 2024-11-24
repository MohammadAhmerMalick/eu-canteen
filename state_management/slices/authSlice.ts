import { signOut } from 'next-auth/react'
import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'

export interface Auth {
  id: string
  name: string
  email: string
  whatsapp: string
  matricola: string
  image: string | null
  idCardFrontImage: string | null
  idCardBackImage: string | null
  credit: string
  role: string
}

export interface AuthState {
  auth: Auth
  authStatus: 'loading' | 'authenticated' | 'unauthenticated'
}

export type AuthActions = {
  logout: () => void
  setAuth: (auth: Auth) => void
  setAuthStatus: (authStatus: AuthState['authStatus']) => void
}

export type AuthSlice = AuthState & AuthActions

export const initialAuthState: AuthState = {
  auth: {
    id: '',
    name: '',
    role: '',
    image: '',
    email: '',
    credit: '',
    whatsapp: '',
    matricola: '',
    idCardBackImage: '',
    idCardFrontImage: '',
  },
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
      return { ...state, auth: initialAuthState.auth }
    }),

  setAuthStatus: async (authStatus: AuthState['authStatus']) =>
    set((state) => {
      return { ...state, authStatus }
    }),
})
