import { alias } from 'drizzle-orm/pg-core'
import { and, eq, inArray } from 'drizzle-orm'

import db from '@/database/index'
import usersTableSchema from '@/database/schema/usersSchema'
import productsTableSchema from '@/database/schema/productsSchema'
import transactionsTableSchema from '@/database/schema/transactionsSchema'
import ordersTableSchema, { type Order } from '@/database/schema/ordersSchema'

const usersTable = alias(usersTableSchema, 'user')
const ordersTable = alias(ordersTableSchema, 'order')
const productsTable = alias(productsTableSchema, 'product')
const transactionsTable = alias(transactionsTableSchema, 'transaction')

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

  static createOrder = (order: Order) =>
    db.insert(ordersTable).values(order).returning({ id: ordersTable.id })

  static updateOrdersStatus = (ids: string[], status: Order['status']) =>
    db
      .update(ordersTable)
      .set({
        status,
      })
      .returning({
        id: ordersTable.id,
      })
      .where(inArray(ordersTable.id, ids))
}

export default OrderModel
