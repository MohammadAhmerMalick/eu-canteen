import { sql } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import usersTable from '@/database/schema/usersSchema'

const notificationsTable = pgTable('notifications', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  message: text().notNull(),
  isRead: boolean().default(false),

  from: uuid()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    }),

  to: text('to')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export type Notification = typeof notificationsTable.$inferInsert

export default notificationsTable
