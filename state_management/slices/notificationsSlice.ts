import { type StateCreator } from 'zustand'

import { type Store } from '@/store/store'
import notificationsTable from '@/database/schema/notificationsSchema'

export interface NotificationsState {
  notifications: (typeof notificationsTable.$inferInsert)[]
}

export type NotificationsActions = {
  setNotifications(notifications: NotificationsState['notifications']): void
  updateNotification(
    notifications: typeof notificationsTable.$inferInsert
  ): void
  deleteNotification(id: string): void
}

export type NotificationsSlice = NotificationsState & NotificationsActions

export const initialNotificationsState: NotificationsState = {
  notifications: [],
}

export const createNotificationsSlice: StateCreator<
  Store,
  [],
  [],
  NotificationsSlice
> = (set) => ({
  ...initialNotificationsState,
  setNotifications: async (notifications) => {
    return set({ notifications })
  },
  updateNotification: async (notification) =>
    set((state) => ({
      ...state,
      notifications: state.notifications.map((s) =>
        s.id === notification.id ? notification : s
      ),
    })),
  deleteNotification: async (id) =>
    set((state) => ({
      ...state,
      notifications: state.notifications.filter((s) => s.id !== id),
    })),
})
