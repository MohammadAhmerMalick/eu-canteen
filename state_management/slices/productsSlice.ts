import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import { type Product } from '@/database/schema/productsSchema'
import { type Category } from '@/database/schema/categoriesSchema'

export interface Products {
  products: Product
  categories: Category | null
}

export interface ProductsState {
  products: Products[]
}

export type ProductsActions = {
  setProducts(products: Products[]): void
  insertProduct(product: Products): void
  updateProduct(product: Products): void
  deleteProduct(id: string): void
  updateProductsPublished(order: Products['products']): void
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
      products: state.products.map((s) =>
        s.products.id === product.products.id ? product : s
      ),
    })),
  deleteProduct: async (id) =>
    set((state) => ({
      ...state,
      products: state.products.filter((s) => s.products.id !== id),
    })),
  updateProductsPublished: async (order) =>
    set((state) => ({
      ...state,
      orders: state.orders.map((s) => ({
        ...s,
        orders:
          s.orders.id === order.id
            ? { ...s.orders, published: order.published }
            : s.orders,
      })),
    })),
})
