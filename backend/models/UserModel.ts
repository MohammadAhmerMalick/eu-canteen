import { eq, getTableColumns, inArray, or } from 'drizzle-orm'

import db from '@/database/index'
import usersTable from '@/database/schema/usersSchema'

class UserModel {
  static getUsers = () => db.select().from(usersTable)

  static getUserById = (id: string) =>
    db.select().from(usersTable).where(eq(usersTable.id, id))

  static getAllStudents = () =>
    db.select().from(usersTable).where(eq(usersTable.roleName, 'student'))

  static getUserByEmail = (email: string) =>
    db.select().from(usersTable).where(eq(usersTable.email, email))

  static getUserByEmailOrMatricola = (email: string, matricola: string) =>
    db
      .select()
      .from(usersTable)
      .where(
        or(eq(usersTable.email, email), eq(usersTable.matricola, matricola))
      )

  static createUser = (user: typeof usersTable.$inferInsert) =>
    db.insert(usersTable).values(user).returning(getTableColumns(usersTable))

  static updateUser = (user: typeof usersTable.$inferInsert, id: string) =>
    db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning(getTableColumns(usersTable))

  static updateUserCredit = (
    id: string,
    credit: (typeof usersTable.$inferInsert)['credit']
  ) =>
    db
      .update(usersTable)
      .set({ credit })
      .where(eq(usersTable.id, id))
      .returning(getTableColumns(usersTable))

  static deleteUser = (id: string) =>
    db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id })

  static updateUsersApprovedState = (
    ids: string[],
    approved: (typeof usersTable.$inferInsert)['approved']
  ) =>
    db
      .update(usersTable)
      .set({
        approved,
      })
      .returning({
        id: usersTable.id,
      })
      .where(inArray(usersTable.id, ids))
}

export default UserModel
