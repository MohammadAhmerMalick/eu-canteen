import { and, eq } from 'drizzle-orm'

import db from '@/database/index'
import usersTable from '@/database/schema/usersSchema'
import productsTable from '@/database/schema/productsSchema'
import transactionsTable from '@/database/schema/transactionsSchema'

class TransactionModel {
  static getTransactions = () =>
    db
      .select()
      .from(transactionsTable)
      .leftJoin(usersTable, eq(usersTable.id, transactionsTable.userId))
      .leftJoin(
        productsTable,
        eq(productsTable.id, transactionsTable.productId)
      )
      .where(eq(transactionsTable.published, true))

  static getTransactionsByUserId = (userId: string) =>
    db
      .select()
      .from(transactionsTable)
      .leftJoin(usersTable, eq(usersTable.id, transactionsTable.userId))
      .leftJoin(
        productsTable,
        eq(productsTable.id, transactionsTable.productId)
      )
      .where(
        and(
          eq(transactionsTable.published, true),
          eq(transactionsTable.userId, userId)
        )
      )

  static getTransactionsByProductId = (productId: string) =>
    db
      .select()
      .from(transactionsTable)
      .leftJoin(usersTable, eq(usersTable.id, transactionsTable.userId))
      .leftJoin(
        productsTable,
        eq(productsTable.id, transactionsTable.productId)
      )
      .where(
        and(
          eq(transactionsTable.published, true),
          eq(transactionsTable.productId, productId)
        )
      )

  static getTransactionsId = (id: string) =>
    db
      .select()
      .from(transactionsTable)
      .leftJoin(usersTable, eq(usersTable.id, transactionsTable.userId))
      .leftJoin(
        productsTable,
        eq(productsTable.id, transactionsTable.productId)
      )
      .where(
        and(eq(transactionsTable.published, true), eq(transactionsTable.id, id))
      )

  static getAllTransactions = () => db.select().from(transactionsTable)

  static createTransaction = (
    transaction: typeof transactionsTable.$inferInsert
  ) =>
    db
      .insert(transactionsTable)
      .values(transaction)
      .returning({ id: transactionsTable.id })
}

export default TransactionModel
