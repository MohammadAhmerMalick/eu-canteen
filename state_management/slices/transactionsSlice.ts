import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import type { User } from '@/database/schema/usersSchema'
import type { Product } from '@/database/schema/productsSchema'
import transactionsTable from '@/database/schema/transactionsSchema'

export interface Transactions {
  transactions: typeof transactionsTable.$inferInsert
  users: User | null
  products: Product | null
}

export interface TransactionsState {
  transactions: Transactions[]
}

export type TransactionsActions = {
  setTransactions(transactions: Transactions[]): void
  insertTransaction(transaction: Transactions): void
  updateTransaction(transaction: Transactions): void
}

export type TransactionsSlice = TransactionsState & TransactionsActions

export const initialTransactionsState: TransactionsState = {
  transactions: [],
}

export const createTransactionsSlice: StateCreator<
  Store,
  [],
  [],
  TransactionsSlice
> = (set) => ({
  ...initialTransactionsState,
  setTransactions: async (transactions) => {
    return set({ transactions })
  },
  insertTransaction: async (transaction) =>
    set((state) => ({
      ...state,
      transactions: [transaction, ...state.transactions],
    })),
  updateTransaction: async (transaction) =>
    set((state) => ({
      ...state,
      transactions: state.transactions.map((s) =>
        s.transactions.id === transaction.transactions.id ? transaction : s
      ),
    })),
})
