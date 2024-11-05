import { createStore } from 'zustand/vanilla'
import {
  authActions,
  AuthActions,
  AuthState,
  defaultAuthState,
} from './authState'

export type DefaultMainState = AuthState
export type MainStore = AuthState & AuthActions

export const defaultMainState: DefaultMainState = defaultAuthState

export const initMainStore = (): DefaultMainState => {
  return defaultMainState
}
export const createMainStore = (
  initState: DefaultMainState = defaultMainState
) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    ...authActions(set),
    decrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}
