import db from '@/database/index'
import usersData from '@/database/data/usersData'
import usersSchema from '@/database/schema/usersSchema'

const usersSeed = async () => {
  await db.delete(usersSchema)
  await db.insert(usersSchema).values(usersData)
}

export default usersSeed
