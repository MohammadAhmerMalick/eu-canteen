import {
  boolean,
  pgTable,
  varchar,
  uuid,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import rolesTable from '@/database/schema/rolesSchema'

const usersTable = pgTable('users', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  whatsapp: varchar({ length: 20 }).notNull(),
  matricola: varchar({ length: 20 }).notNull().unique(),
  image: varchar({ length: 255 }),
  approved: boolean().default(false).notNull(),
  password: varchar({ length: 255 }),
  credit: numeric({ precision: 10, scale: 4 }).default('0').notNull(),

  roleName: varchar({ length: 20 })
    .notNull()
    .default('student')
    .references(() => rolesTable.name, {
      onDelete: 'cascade',
    }),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export type User = typeof usersTable.$inferInsert

export default usersTable
