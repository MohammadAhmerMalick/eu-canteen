import { sql } from 'drizzle-orm'
import { boolean, pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'

import rolesTable from '@/database/schema/rolesSchema'

const usersTable = pgTable('users', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .unique(),

  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  whatsapp: varchar({ length: 20 }).notNull(),
  matricola: varchar({ length: 20 }).notNull(),
  idCardFrontImage: varchar({ length: 20 }),
  idCardBackImage: varchar({ length: 20 }),
  approved: boolean().default(false),

  roleName: varchar({ length: 20 })
    .default('student')
    .references(() => rolesTable.name, {
      onDelete: 'cascade',
    }),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export default usersTable
