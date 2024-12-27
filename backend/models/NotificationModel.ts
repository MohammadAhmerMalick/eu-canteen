import { and, arrayOverlaps, desc, eq, getTableColumns } from 'drizzle-orm'

import db from '@/database/index'
import notificationsTable from '@/database/schema/notificationsSchema'
import type { Notification } from '@/database/schema/notificationsSchema'

class NotificationModel {
  static getNotifications = () =>
    db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.published, true))
      .orderBy(desc(notificationsTable.createdAt))

  static getPublicAndUserNotificationsByUserId = (userId: string) =>
    db
      .select()
      .from(notificationsTable)
      .where(
        and(
          eq(notificationsTable.published, true),
          arrayOverlaps(notificationsTable.to, ['general', userId])
        )
      )
      .orderBy(desc(notificationsTable.createdAt))

  static getAllNotifications = () => db.select().from(notificationsTable)

  static getNotification = (id: string) =>
    db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.id, id))
      .orderBy(desc(notificationsTable.createdAt))

  static createNotification = (notification: Notification) =>
    db
      .insert(notificationsTable)
      .values(notification)
      .returning(getTableColumns(notificationsTable))

  static makeNotificationRead = (id: string) =>
    db
      .update(notificationsTable)
      .set({ isRead: true })
      .where(eq(notificationsTable.id, id))
      .returning({ id: notificationsTable.id })

  static softDeleteNotification = (id: string) =>
    db
      .update(notificationsTable)
      .set({ published: false })
      .where(eq(notificationsTable.id, id))
      .returning({ id: notificationsTable.id })
}

export default NotificationModel
