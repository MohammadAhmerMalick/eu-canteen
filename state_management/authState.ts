import logoutAction from '@/actions/logoutAction'

export type AuthState = {
  isLoggedIn: boolean
  count: number
}
export const defaultAuthState: AuthState = {
  isLoggedIn: false,
  count: 0,
}

export const initAuthStore = (): AuthState => {
  return { isLoggedIn: false, count: 0 }
}

export type AuthActions = {
  setIsLoggedIn: (flag: boolean) => void
  decrementCount: () => void
}

export const authActions = (set: any) => ({
  setIsLoggedIn: (flag: boolean) =>
    set((state: any) => {
      logoutAction()
      return { ...state, isLoggedIn: flag }
    }),
})
