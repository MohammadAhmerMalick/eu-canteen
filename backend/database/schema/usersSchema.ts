import { sql } from 'drizzle-orm'
import { boolean, pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'

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
  idCardFrontImage: varchar({ length: 255 }),
  idCardBackImage: varchar({ length: 255 }),
  approved: boolean().default(false).notNull(),
  password: varchar({ length: 255 }),

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

export default usersTable
