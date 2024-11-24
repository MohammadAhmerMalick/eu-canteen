import {
  boolean,
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import usersTable from '@/database/schema/usersSchema'
import productsTable from '@/database/schema/productsSchema'
import transactionsTable from '@/database/schema/transactionsSchema'

const ordersTable = pgTable('orders', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  type: varchar({ length: 40 }).notNull(), // takeaway | dining
  unitPrice: numeric({ precision: 10, scale: 4 }).notNull(),
  quantity: integer().notNull(),
  status: varchar({ length: 40 }).notNull().default('pending'), // pending | ready | canceled | completed

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
  transactionId: uuid()
    .notNull()
    .references(() => transactionsTable.id, {
      onDelete: 'cascade',
    }),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export default ordersTable
