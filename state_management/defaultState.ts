import { initialAppState } from '@/store/slices/appSlice'
import { initialAuthState } from '@/store/slices/authSlice'
import { initialStudentsState } from '@/store/slices/studentsSlice'
import { initialProductsState } from '@/store/slices/productssSlice'
import { initialNotificationsState } from './slices/notificationsSlice'

export const defaultState = {
  ...initialAppState,
  ...initialAuthState,
  ...initialStudentsState,
  ...initialProductsState,
  ...initialNotificationsState,
}
