import { sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import categoriesTable from '@/database/schema/categoriesSchema'

const productsTable = pgTable('products', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  name: varchar({ length: 20 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  stock: integer().notNull(),
  price: integer().notNull(),

  categoryId: uuid('categoryId')
    .notNull()
    .references(() => categoriesTable.id, {
      onDelete: 'cascade',
    }),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export default productsTable
