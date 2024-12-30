import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import type { User } from '@/database/schema/usersSchema'
import type { Product } from '@/database/schema/productsSchema'
import { type Transaction } from '@/database/schema/transactionsSchema'

export interface TransactionSlice {
  transaction: Transaction
  user: User | null
  product: Product | null
}

export interface TransactionsState {
  transactions: TransactionSlice[]
}

export type TransactionsActions = {
  setTransactions(transactions: TransactionSlice[]): void
  insertTransaction(transaction: TransactionSlice): void
  updateTransaction(transaction: TransactionSlice): void
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
        s.transaction.id === transaction.transaction.id ? transaction : s
      ),
    })),
})
