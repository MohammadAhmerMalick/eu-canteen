import { createStore } from 'zustand/vanilla'

import { defaultState } from '@/store/defaultState'
import { AuthSlice, createAuthSlice } from '@/store/slices/authSlice'
import { AppSlice, AppState, createAppSlice } from '@/store/slices/appSlice'

export type Store = AppSlice & AuthSlice

export const initStore = () => {
  return defaultState
}

export const createAppStore = (initState: AppState = defaultState) => {
  return createStore<Store>()((set, get, store) => ({
    ...initState,
    ...createAppSlice(set, get, store),
    ...createAuthSlice(set, get, store),
  }))
}
