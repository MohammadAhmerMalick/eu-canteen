import { sql } from 'drizzle-orm'
import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

const rolesTable = pgTable('roles', {
  id: uuid()
    .unique()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  name: varchar({ length: 20 }).notNull().unique(), // admin student player

  published: boolean().default(true),
  createdAt: timestamp().default(sql`now()`),
  deletedAt: timestamp(),
})

export default rolesTable
