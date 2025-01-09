import { and, eq, getTableColumns, lt } from 'drizzle-orm'

import db from '@/database/index'
import otpsTable, { type Otp } from '@/database/schema/otpsSchema'

interface getOtpByUserIdAndTypeProp {
  otp: string
  type: string
  userId: string
  date: Date
}

class OtpModel {
  static getOtpByUserIdAndType = ({
    otp,
    date,
    type,
    userId,
  }: getOtpByUserIdAndTypeProp) =>
    db
      .select()
      .from(otpsTable)
      .where(
        and(
          eq(otpsTable.code, otp),
          eq(otpsTable.type, type),
          eq(otpsTable.userId, userId),
          lt(otpsTable.createdAt, date)
        )
      )

  static createOtp = (otp: Otp) =>
    db.insert(otpsTable).values(otp).returning(getTableColumns(otpsTable))

  static deleteOtp = (id: string) =>
    db
      .delete(otpsTable)
      .where(eq(otpsTable.id, id))
      .returning({ id: otpsTable.id })
}

export default OtpModel
