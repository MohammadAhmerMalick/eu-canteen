import { AppState, initialAppState } from '@/store/slices/appSlice'
import { initialAuthState } from '@/store/slices/authSlice'

export const defaultState: AppState = {
  ...initialAppState,
  ...initialAuthState,
}
