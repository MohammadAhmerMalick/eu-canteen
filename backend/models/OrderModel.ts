import { eq, getTableColumns } from 'drizzle-orm'

import db from '@/database/index'
import ordersTable from '@/database/schema/ordersSchema'

class OrderModel {
  static getOrders = () =>
    db.select().from(ordersTable).where(eq(ordersTable.published, true))

  static getAllOrders = () => db.select().from(ordersTable)

  static createOrder = (order: typeof ordersTable.$inferInsert) =>
    db.insert(ordersTable).values(order).returning(getTableColumns(ordersTable))

  static updateOrderStatus = (
    status: (typeof ordersTable.$inferInsert)['status'],
    id: string
  ) =>
    db
      .update(ordersTable)
      .set({
        status,
      })
      .returning({
        id: ordersTable.id,
      })
      .where(eq(ordersTable.id, id))
}

export default OrderModel
