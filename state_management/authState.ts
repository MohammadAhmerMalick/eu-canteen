import logoutAction from '@/actions/logoutAction'

export type AuthState = {
  isLoggedIn: boolean
}
export const defaultAuthState: AuthState = {
  isLoggedIn: false,
}

export type AuthActions = {
  setIsLoggedIn: (flag: boolean) => void
}

export const authActions = (set: any) => ({
  setIsLoggedIn: (flag: boolean) =>
    set((state: any) => {
      if (!flag) logoutAction()
      return { ...state, isLoggedIn: flag }
    }),
})
