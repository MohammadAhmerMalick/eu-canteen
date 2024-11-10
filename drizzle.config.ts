import { defineConfig } from 'drizzle-kit'

const schemas = ['users', 'roles', 'categories', 'products']

const getSchemaPath = (fileNames: string[]) =>
  fileNames.map((fileName) => `./backend/database/schema/${fileName}Schema.ts`)

export default defineConfig({
  out: './drizzle',
  schema: getSchemaPath(schemas),
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
