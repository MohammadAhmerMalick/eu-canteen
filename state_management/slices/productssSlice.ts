import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import productsTable from '@/database/schema/productsSchema'

export interface ProductsState {
  products: (typeof productsTable.$inferInsert)[]
}

export type ProductsActions = {
  setProducts(products: ProductsState['products']): void
}

export type ProductsSlice = ProductsState & ProductsActions

export const initialProductsState: ProductsState = {
  products: [],
}

export const createProductsSlice: StateCreator<Store, [], [], ProductsSlice> = (
  set
) => ({
  ...initialProductsState,
  setProducts: async (products) => {
    return set({ products })
  },
})
