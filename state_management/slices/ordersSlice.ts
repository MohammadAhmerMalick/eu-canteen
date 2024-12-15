import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import type { User } from '@/database/schema/usersSchema'
import type { Order } from '@/database/schema/ordersSchema'
import { type Product } from '@/database/schema/productsSchema'
import { type Transaction } from '@/database/schema/transactionsSchema'

export interface OrderSlice {
  order: Order
  user: User | null
  product: Product | null
  transaction: Transaction | null
}

export interface OrdersState {
  orders: OrderSlice[]
}

export type OrdersActions = {
  setOrders(orderSlices: OrderSlice[]): void
  insertOrder(orderSlice: OrderSlice): void
  updateOrder(orderSlice: OrderSlice): void
  updateOrdersStatus(orderSlice: OrderSlice['order']): void
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
        s.order.id === order.order.id ? order : s
      ),
    })),
  updateOrdersStatus: async (order) =>
    set((state) => ({
      ...state,
      orders: state.orders.map((s) => ({
        ...s,
        orders:
          s.order.id === order.id
            ? { ...s.order, status: order.status }
            : s.order,
      })),
    })),
})
