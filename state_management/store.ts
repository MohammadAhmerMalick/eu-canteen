import { createStore } from 'zustand/vanilla'

export type AuthState = {
  isLoggedIn: boolean
}
export const defaultInitState: AuthState = {
  isLoggedIn: false,
}
export const initAuthStore = (): AuthState => {
  return { isLoggedIn: false }
}

export type AuthActions = {
  setIsLoggedIn: (flag: boolean) => void
}

export type AuthStore = AuthState & AuthActions

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setIsLoggedIn: (flag) => set(() => ({ isLoggedIn: flag })),
  }))
}
