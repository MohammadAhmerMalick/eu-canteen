import db from '@/database/index'
import rolesData from '@/database/data/rolesData'
import rolesSchema from '@/database/schema/rolesSchema'

const rolesSeed = async () => {
  await db.delete(rolesSchema)
  await db.insert(rolesSchema).values(rolesData)
}

export default rolesSeed
