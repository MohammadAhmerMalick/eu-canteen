import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import usersTable from '@/database/schema/usersSchema'
import productsTable from '@/database/schema/productsSchema'

const transactionsTable = pgTable('transactions', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  amount: numeric({ precision: 10, scale: 4 }).notNull(),
  transactionType: varchar({ length: 10 }).notNull(), // debit | credit
  description: text().notNull(),

  userId: uuid()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    }),
  productId: uuid()
    .notNull()
    .references(() => productsTable.id, {
      onDelete: 'cascade',
    }),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export default transactionsTable
