import { sql } from 'drizzle-orm'
import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import usersTable from '@/database/schema/usersSchema'

const otpsTable = pgTable('otps', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  code: varchar({ length: 20 }).notNull(),
  type: varchar({ length: 100 }).notNull(), // takeaway | dine in

  userId: uuid()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    }),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export type Otp = typeof otpsTable.$inferInsert

export default otpsTable
