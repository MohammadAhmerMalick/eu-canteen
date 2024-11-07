import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development')

const client = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(client)

export default db
