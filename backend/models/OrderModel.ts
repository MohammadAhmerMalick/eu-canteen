import { eq } from 'drizzle-orm'

import db from '@/database/index'
import ordersTable from '@/database/schema/ordersSchema'

class OrderModel {
  static getOrders = () =>
    db.select().from(ordersTable).where(eq(ordersTable.published, true))

  static getAllOrders = () => db.select().from(ordersTable)

  static createOrder = (order: typeof ordersTable.$inferInsert) =>
    db.insert(ordersTable).values(order).returning({
      id: ordersTable.id,
      type: ordersTable.type,
      unitPrice: ordersTable.unitPrice,
      quantity: ordersTable.quantity,
      status: ordersTable.status,
      userId: ordersTable.userId,
      productId: ordersTable.productId,
      published: ordersTable.published,
      createdAt: ordersTable.createdAt,
      deletedAt: ordersTable.deletedAt,
    })

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
