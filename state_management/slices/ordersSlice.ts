import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import ordersTable from '@/database/schema/ordersSchema'

export interface OrdersState {
  orders: (typeof ordersTable.$inferInsert)[]
}

export type OrdersActions = {
  setOrders(orders: OrdersState['orders']): void
  insertOrder(order: typeof ordersTable.$inferInsert): void
  updateOrder(order: typeof ordersTable.$inferInsert): void
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
      orders: state.orders.map((s) => (s.id === order.id ? order : s)),
    })),
})
