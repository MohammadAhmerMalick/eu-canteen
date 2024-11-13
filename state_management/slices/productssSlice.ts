import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import productsTable from '@/database/schema/productsSchema'

export interface ProductsState {
  products: (typeof productsTable.$inferInsert)[]
}

export type ProductsActions = {
  setProducts(products: ProductsState['products']): void
  insertProduct(product: typeof productsTable.$inferInsert): void
  updateProduct(products: typeof productsTable.$inferInsert): void
  deleteProduct(id: string): void
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
  insertProduct: async (product) =>
    set((state) => ({
      ...state,
      products: [product, ...state.products],
    })),
  updateProduct: async (product) =>
    set((state) => ({
      ...state,
      products: state.products.map((c) => (c.id === product.id ? product : c)),
    })),
  deleteProduct: async (id) =>
    set((state) => ({
      ...state,
      products: state.products.filter((c) => c.id !== id),
    })),
})
