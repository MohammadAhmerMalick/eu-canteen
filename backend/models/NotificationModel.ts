import { eq } from 'drizzle-orm'

import db from '@/database/index'
import notificationsTable from '@/database/schema/notificationsSchema'

class NotificationModel {
  static getNotifications = () =>
    db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.published, true))

  static getAllNotifications = () => db.select().from(notificationsTable)

  static getNotification = (id: string) =>
    db.select().from(notificationsTable).where(eq(notificationsTable.id, id))

  static createNotification = (
    notification: typeof notificationsTable.$inferInsert
  ) =>
    db
      .insert(notificationsTable)
      .values(notification)
      .returning({ id: notificationsTable.id })

  static deleteNotification = (id: string) =>
    db
      .delete(notificationsTable)
      .where(eq(notificationsTable.id, id))
      .returning({ id: notificationsTable.id })
}

export default NotificationModel
