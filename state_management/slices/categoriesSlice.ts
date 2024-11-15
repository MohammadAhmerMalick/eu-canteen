import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import categoriesTable from '@/database/schema/categoriesSchema'

export interface CategoriesState {
  categories: (typeof categoriesTable.$inferInsert)[]
}

export type CategoriesActions = {
  setCategories(categories: CategoriesState['categories']): void
  insertCategory(category: typeof categoriesTable.$inferInsert): void
  updateCategory(category: typeof categoriesTable.$inferInsert): void
  deleteCategory(id: string): void
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
  setCategories: async (categories) => set({ categories }),
  ...initialCategoriesState,
  insertCategory: async (category) =>
    set((state) => ({
      ...state,
      categories: [category, ...state.categories],
    })),
  updateCategory: async (category) =>
    set((state) => ({
      ...state,
      categories: state.categories.map((c) =>
        c.id === category.id ? category : c
      ),
    })),
  deleteCategory: async (id) =>
    set((state) => ({
      ...state,
      categories: state.categories.filter((c) => c.id !== id),
    })),
})
