import { initialAppState } from '@/store/slices/appSlice'
import { initialAuthState } from '@/store/slices/authSlice'
import { initialUsersState } from '@/store/slices/usersSlice'
import { initialOrdersState } from '@/store/slices/ordersSlice'
import { initialProductsState } from '@/store/slices/productsSlice'
import { initialTransactionsState } from '@/store/slices/transactionsSlice'
import { initialNotificationsState } from '@/store/slices/notificationsSlice'

export const defaultState = {
  ...initialAppState,
  ...initialAuthState,
  ...initialUsersState,
  ...initialOrdersState,
  ...initialProductsState,
  ...initialTransactionsState,
  ...initialNotificationsState,
}
