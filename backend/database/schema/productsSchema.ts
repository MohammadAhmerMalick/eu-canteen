import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

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
  price: numeric({ precision: 10, scale: 4 }).notNull(),

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
