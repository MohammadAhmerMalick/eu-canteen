import db from '@/database/index'
import notificationsData from '@/database/data/notificationsData'
import notificationsSchema from '@/database/schema/notificationsSchema'

const notificationsSeed = async () => {
  await db.delete(notificationsSchema)
  await db.insert(notificationsSchema).values(notificationsData)
}

export default notificationsSeed
