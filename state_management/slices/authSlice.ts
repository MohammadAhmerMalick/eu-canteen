import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import logoutAction from '@/actions/logoutAction'

interface Auth {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthState {
  auth: Auth | null
}

export type AuthActions = {
  setAuth: (auth: Auth) => void
  logout: () => void
}

export type AuthSlice = AuthState & AuthActions

export const initialAuthState: AuthState = {
  auth: null,
}

export const createAuthSlice: StateCreator<Store, [], [], AuthSlice> = (
  set
) => ({
  ...initialAuthState,
  setAuth: (auth: Auth) =>
    set((state: any) => {
      return { ...state, auth }
    }),

  logout: async () =>
    set((state) => {
      logoutAction()
      return { ...state, auth: null }
    }),
})
