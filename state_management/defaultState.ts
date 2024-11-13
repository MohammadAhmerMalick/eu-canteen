import { initialAppState } from '@/store/slices/appSlice'
import { initialAuthState } from '@/store/slices/authSlice'
import { initialUsersState } from '@/store/slices/userssSlice'
import { initialProductsState } from '@/store/slices/productssSlice'
import { initialNotificationsState } from './slices/notificationsSlice'

export const defaultState = {
  ...initialAppState,
  ...initialAuthState,
  ...initialUsersState,
  ...initialProductsState,
  ...initialNotificationsState,
}
