import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import categoriesTable from '@/database/schema/categoriesSchema'

export interface CategoriesState {
  categories: (typeof categoriesTable.$inferInsert)[]
}

export type CategoriesActions = {
  setCategories(categories: CategoriesState['categories']): void
}

export type CategoriesSlice = CategoriesState & CategoriesActions

export const initialCategoriesState: CategoriesState = {
  categories: [],
}

export const createCategoriesSlice: StateCreator<
  Store,
  [],
  [],
  CategoriesSlice
> = (set) => ({
  ...initialCategoriesState,
  setCategories: async (categories) => {
    return set({ categories })
  },
})
