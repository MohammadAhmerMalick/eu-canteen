import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import { type Category } from '@/database/schema/categoriesSchema'

export interface CategoriesState {
  categories: Category[]
}

export type CategoriesActions = {
  setCategories(categories: CategoriesState['categories']): void
  insertCategory(category: Category): void
  updateCategory(category: Category): void
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
