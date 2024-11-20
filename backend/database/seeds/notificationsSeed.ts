import db from '@/database/index'
import notificationsData from '@/database/data/notificationsData'
import notificationsSchema from '@/database/schema/notificationsSchema'

const notificationsSeed = async (ids: { id: string }[]) => {
  await db.delete(notificationsSchema)
  await db.insert(notificationsSchema).values(notificationsData(ids))
}

export default notificationsSeed
