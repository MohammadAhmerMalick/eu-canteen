import db from '@/database/index'
import usersData from '@/database/data/usersData'
import usersTable from '@/database/schema/usersSchema'

const usersSeed = async () => {
  await db.delete(usersTable)
  return db
    .insert(usersTable)
    .values(usersData)
    .returning({ id: usersTable.id })
}

export default usersSeed
