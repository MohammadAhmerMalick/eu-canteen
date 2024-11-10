import { eq } from 'drizzle-orm'

import db from '@/database/index'
import usersTable from '@/database/schema/usersSchema'

class UserModel {
  static getUsers = () => db.select().from(usersTable)

  static getStudents = () =>
    db.select().from(usersTable).where(eq(usersTable.roleName, 'student'))

  static getUserByEmail = (email: string) =>
    db.select().from(usersTable).where(eq(usersTable.email, email))

  static createUser = (user: typeof usersTable.$inferInsert) =>
    db.insert(usersTable).values(user).returning({ id: usersTable.id })

  static updateUser = (user: typeof usersTable.$inferInsert, id: string) =>
    db
      .update(usersTable)
      .set(user)
      .returning({ id: usersTable.id })
      .where(eq(usersTable.id, id))

  static deleteUser = (id: string) =>
    db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id })
}

export default UserModel
