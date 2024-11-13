import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import usersTable from '@/database/schema/usersSchema'

export interface StudentsState {
  students: (typeof usersTable.$inferInsert)[]
}

export type StudentsActions = {
  setStudents(students: StudentsState['students']): void
}

export type StudentsSlice = StudentsState & StudentsActions

export const initialStudentsState: StudentsState = {
  students: [],
}

export const createStudentsSlice: StateCreator<Store, [], [], StudentsSlice> = (
  set
) => ({
  ...initialStudentsState,
  setStudents: async (students) => {
    return set({ students })
  },
})
