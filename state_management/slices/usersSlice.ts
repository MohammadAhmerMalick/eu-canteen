import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import type { User } from '@/database/schema/usersSchema'

export interface UsersState {
  users: User[]
}

export type UsersActions = {
  setUsers(users: UsersState['users']): void
  insertUser(users: User): void
  updateUser(users: User): void
  deleteUser(id: string): void
}

export type UsersSlice = UsersState & UsersActions

export const initialUsersState: UsersState = {
  users: [],
}

export const createUsersSlice: StateCreator<Store, [], [], UsersSlice> = (
  set
) => ({
  ...initialUsersState,
  setUsers: async (users) => {
    return set({ users })
  },
  insertUser: async (user) =>
    set((state) => ({
      ...state,
      users: [user, ...state.users],
    })),
  updateUser: async (user) =>
    set((state) => ({
      ...state,
      users: state.users.map((c) => (c.id === user.id ? user : c)),
    })),
  deleteUser: async (id) =>
    set((state) => ({
      ...state,
      users: state.users.filter((c) => c.id !== id),
    })),
})
