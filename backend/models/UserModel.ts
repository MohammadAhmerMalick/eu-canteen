import { and, eq, getTableColumns, inArray, or } from 'drizzle-orm'

import db from '@/database/index'
import { CONSTANTS } from '@/utils'
import usersTable from '@/database/schema/usersSchema'
import type { User } from '@/database/schema/usersSchema'

class UserModel {
  static getUsers = () => db.select().from(usersTable)

  static getUserById = (id: string) =>
    db.select().from(usersTable).where(eq(usersTable.id, id))

  static getAllStudents = () =>
    db.select().from(usersTable).where(eq(usersTable.roleName, 'student'))

  static getAllPlayers = () =>
    db
      .select()
      .from(usersTable)
      .where(eq(usersTable.roleName, CONSTANTS.roleName.player))

  static getUserByEmail = (email: string) =>
    db.select().from(usersTable).where(eq(usersTable.email, email))

  static getUserByEmailOrMatricola = (email: string, matricola: string) =>
    db
      .select()
      .from(usersTable)
      .where(
        or(eq(usersTable.email, email), eq(usersTable.matricola, matricola))
      )

  static createUser = (user: User) =>
    db.insert(usersTable).values(user).returning(getTableColumns(usersTable))

  static updateUser = (user: User, id: string) =>
    db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning(getTableColumns(usersTable))

  static updateUserCredit = (id: string, credit: User['credit']) =>
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

  static updateUsersApproved = (ids: string[], approved: User['approved']) =>
    db
      .update(usersTable)
      .set({ approved })
      .returning({
        id: usersTable.id,
      })
      .where(inArray(usersTable.id, ids))

  static updateUsersPublished = (ids: string[], published: User['published']) =>
    db
      .update(usersTable)
      .set({ published })
      .returning({
        id: usersTable.id,
      })
      .where(inArray(usersTable.id, ids))

  static getActiveCredits = () =>
    db
      .select({
        id: usersTable.id,
        credit: usersTable.credit,
      })
      .from(usersTable)
      .where(
        and(
          eq(usersTable.approved, true),
          eq(usersTable.published, true),
          eq(usersTable.roleName, 'student')
        )
      )
}
export default UserModel
