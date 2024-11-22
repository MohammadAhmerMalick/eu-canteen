import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import usersTable from '@/database/schema/usersSchema'
import ordersTable from '@/database/schema/ordersSchema'
import productsTable from '@/database/schema/productsSchema'

export interface Orders {
  orders: typeof ordersTable.$inferInsert
  users: typeof usersTable.$inferInsert | null
  products: typeof productsTable.$inferInsert | null
}

export interface OrdersState {
  orders: Orders[]
}

export type OrdersActions = {
  setOrders(orders: Orders[]): void
  insertOrder(order: Orders): void
  updateOrder(order: Orders): void
}

export type OrdersSlice = OrdersState & OrdersActions

export const initialOrdersState: OrdersState = {
  orders: [],
}

export const createOrdersSlice: StateCreator<Store, [], [], OrdersSlice> = (
  set
) => ({
  ...initialOrdersState,
  setOrders: async (orders) => {
    return set({ orders })
  },
  insertOrder: async (order) =>
    set((state) => ({
      ...state,
      orders: [order, ...state.orders],
    })),
  updateOrder: async (order) =>
    set((state) => ({
      ...state,
      orders: state.orders.map((s) =>
        s.orders.id === order.orders.id ? order : s
      ),
    })),
})
