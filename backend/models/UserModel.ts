import { eq } from 'drizzle-orm'

import db from '@/database/index'
import usersTable from '@/database/schema/usersSchema'

class UserModel {
  static getUsers = () => db.select().from(usersTable)

  static getUserByEmail = (email: string) =>
    db.select().from(usersTable).where(eq(usersTable.email, email))

  static createUser = (user: typeof usersTable.$inferInsert) =>
    db.insert(usersTable).values(user).returning({ id: usersTable.id })
}

export default UserModel
