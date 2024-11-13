import { StateCreator } from 'zustand'

import { Store } from '@/store/store'
import logoutAction from '@/actions/logoutAction'

export interface AuthState {
  isLoggedIn: boolean
}

export type AuthActions = {
  setIsLoggedIn(isLoggedIn: AuthState['isLoggedIn']): void
}

export type AuthSlice = AuthState & AuthActions

export const initialAuthState: AuthState = {
  isLoggedIn: false,
}

export const createAuthSlice: StateCreator<Store, [], [], AuthSlice> = (
  set
) => ({
  ...initialAuthState,
  setIsLoggedIn: async (isLoggedIn) => {
    if (!isLoggedIn) await logoutAction()
    return set({ isLoggedIn })
  },
})
