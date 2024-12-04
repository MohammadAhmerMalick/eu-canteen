import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import usersTable from '@/database/schema/usersSchema'
import ordersTable from '@/database/schema/ordersSchema'
import { type Product } from '@/database/schema/productsSchema'
import transactionsTable from '@/database/schema/transactionsSchema'

export interface Orders {
  orders: typeof ordersTable.$inferInsert
  users: typeof usersTable.$inferInsert | null
  products: Product | null
  transactions: typeof transactionsTable.$inferInsert | null
}

export interface OrdersState {
  orders: Orders[]
}

export type OrdersActions = {
  setOrders(orders: Orders[]): void
  insertOrder(order: Orders): void
  updateOrder(order: Orders): void
  updateOrdersStatus(order: Orders['orders']): void
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
  updateOrdersStatus: async (order) =>
    set((state) => ({
      ...state,
      orders: state.orders.map((s) => ({
        ...s,
        orders:
          s.orders.id === order.id
            ? { ...s.orders, status: order.status }
            : s.orders,
      })),
    })),
})
