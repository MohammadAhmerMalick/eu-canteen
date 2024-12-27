import { alias } from 'drizzle-orm/pg-core'
import { and, desc, eq, gt, lt, inArray } from 'drizzle-orm'

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
      .orderBy(desc(ordersTable.createdAt), usersTable.name)

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
      .orderBy(desc(ordersTable.createdAt), usersTable.name)

  static getOrdersByDate = (start: Date, end: Date) =>
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
        and(
          eq(ordersTable.published, true),
          gt(ordersTable.createdAt, start),
          lt(ordersTable.createdAt, end)
        )
      )
      .orderBy(desc(ordersTable.createdAt), usersTable.name)

  static getOrder = (id: string) =>
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

  static createOrder = (order: Order) =>
    db
      .insert(ordersTableSchema)
      .values(order)
      .returning({ id: ordersTableSchema.id })

  static updateOrdersStatus = (ids: string[], status: Order['status']) =>
    db
      .update(ordersTableSchema)
      .set({
        status,
      })
      .returning({
        id: ordersTableSchema.id,
      })
      .where(inArray(ordersTableSchema.id, ids))
}

export default OrderModel
