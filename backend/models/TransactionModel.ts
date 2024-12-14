import { alias } from 'drizzle-orm/pg-core'
import { and, desc, eq, gte } from 'drizzle-orm'

import db from '@/database/index'
import usersTableSchema from '@/database/schema/usersSchema'
import productsTableSchema from '@/database/schema/productsSchema'
import transactionsTableSchema, {
  type Transaction,
} from '@/database/schema/transactionsSchema'

const usersTable = alias(usersTableSchema, 'user')
const productsTable = alias(productsTableSchema, 'product')
const transactionsTable = alias(transactionsTableSchema, 'transaction')

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
      .orderBy(desc(transactionsTable.createdAt), usersTable.name)

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
      .orderBy(desc(transactionsTable.createdAt), usersTable.name)

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
      .orderBy(desc(transactionsTable.createdAt), usersTable.name)

  static getAllTransactions = () => db.select().from(transactionsTable)

  static createTransaction = (transaction: Transaction) =>
    db
      .insert(transactionsTable)
      .values(transaction)
      .returning({ id: transactionsTable.id })

  static getUserTodaysTransactions = (userId: string) =>
    db
      .select({ amount: transactionsTable.amount })
      .from(transactionsTable)
      .leftJoin(usersTable, eq(usersTable.id, transactionsTable.userId))
      .leftJoin(
        productsTable,
        eq(productsTable.id, transactionsTable.productId)
      )
      .where(
        and(
          eq(transactionsTable.published, true),
          eq(transactionsTable.userId, userId),
          gte(
            transactionsTable.createdAt,
            new Date(new Date().setHours(0, 0, 0, 0))
          )
        )
      )
}

export default TransactionModel
