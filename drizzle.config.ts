import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: ['./backend/database/schema/testSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
