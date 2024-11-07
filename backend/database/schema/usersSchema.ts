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
  whatsapp_number: varchar({ length: 20 }).notNull(),
  matricola_number: varchar({ length: 20 }).notNull(),
  id_card_front_image: varchar({ length: 20 }),
  id_card_back_image: varchar({ length: 20 }),

  role_id: varchar({ length: 20 }).references(() => rolesTable.name, {
    onDelete: 'cascade',
  }),

  published: boolean().default(true),
  created_at: timestamp().default(sql`now()`),
  deleted_at: timestamp(),
})

export default usersTable
