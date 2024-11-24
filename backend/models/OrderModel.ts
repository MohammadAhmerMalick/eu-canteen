import { and, eq } from 'drizzle-orm'

import db from '@/database/index'
import ordersTable from '@/database/schema/ordersSchema'
import usersTable from '@/database/schema/usersSchema'
import productsTable from '@/database/schema/productsSchema'
import transactionsTable from '@/database/schema/transactionsSchema'

class OrderModel {
  static getOrders = () =>
    db
      .select()
      .from(ordersTable)
      .leftJoin(usersTable, eq(usersTable.id, ordersTable.userId))
      .leftJoin(productsTable, eq(productsTable.id, ordersTable.productId))
      .leftJoin(
        transactionsTable,
        eq(transactionsTable.id, ordersTable.transactionId)
      )
      .where(eq(ordersTable.published, true))

  static getOrdersByUserId = (userId: string) =>
    db
      .select()
      .from(ordersTable)
      .leftJoin(usersTable, eq(usersTable.id, ordersTable.userId))
      .leftJoin(productsTable, eq(productsTable.id, ordersTable.productId))
      .leftJoin(
        transactionsTable,
        eq(transactionsTable.id, ordersTable.transactionId)
      )
      .where(
        and(eq(ordersTable.published, true), eq(ordersTable.userId, userId))
      )

  static getOrdersId = (id: string) =>
    db
      .select()
      .from(ordersTable)
      .leftJoin(usersTable, eq(usersTable.id, ordersTable.userId))
      .leftJoin(productsTable, eq(productsTable.id, ordersTable.productId))
      .leftJoin(
        transactionsTable,
        eq(transactionsTable.id, ordersTable.transactionId)
      )
      .where(and(eq(ordersTable.published, true), eq(ordersTable.id, id)))

  static getAllOrders = () => db.select().from(ordersTable)

  static createOrder = (order: typeof ordersTable.$inferInsert) =>
    db.insert(ordersTable).values(order).returning({ id: ordersTable.id })

  static updateOrderStatus = (
    id: string,
    status: (typeof ordersTable.$inferInsert)['status']
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
