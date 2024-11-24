import { createStore } from 'zustand/vanilla'

import {
  createProductsSlice,
  type ProductsSlice,
} from '@/store/slices/productsSlice'
import {
  type CategoriesSlice,
  createCategoriesSlice,
} from '@/store/slices/categoriesSlice'
import {
  type TransactionsSlice,
  createTransactionsSlice,
} from '@/store/slices/transactionsSlice'
import {
  createNotificationsSlice,
  type NotificationsSlice,
} from '@/store/slices/notificationsSlice'
import { defaultState } from '@/store/defaultState'
import { type AppSlice, createAppSlice } from '@/store/slices/appSlice'
import { type AuthSlice, createAuthSlice } from '@/store/slices/authSlice'
import { type UsersSlice, createUsersSlice } from '@/store/slices/usersSlice'
import { type OrdersSlice, createOrdersSlice } from '@/store/slices/ordersSlice'

export type Store = AppSlice &
  AuthSlice &
  UsersSlice &
  OrdersSlice &
  ProductsSlice &
  CategoriesSlice &
  TransactionsSlice &
  NotificationsSlice

export const initStore = () => {
  return defaultState
}

export const createAppStore = (initState = defaultState) => {
  return createStore<Store>()((set, get, store) => ({
    ...initState,
    ...createAppSlice(set, get, store),
    ...createAuthSlice(set, get, store),
    ...createUsersSlice(set, get, store),
    ...createOrdersSlice(set, get, store),
    ...createProductsSlice(set, get, store),
    ...createCategoriesSlice(set, get, store),
    ...createTransactionsSlice(set, get, store),
    ...createNotificationsSlice(set, get, store),
  }))
}
