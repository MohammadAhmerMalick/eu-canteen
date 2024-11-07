import { boolean, pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

const testSchema = pgTable('test', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  country: varchar({ length: 255 }),
  toll_free_text: varchar({ length: 255 }),
  toll_free_number: varchar({ length: 255 }),
  phone_number: varchar({ length: 255 }),
  phone_number_text: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  address: varchar({ length: 255 }),

  published: boolean().default(true),
  created_at: timestamp().default(sql`now()`),
  deleted_at: timestamp(),
})

export default testSchema
