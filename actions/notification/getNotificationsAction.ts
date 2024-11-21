'use server'

import { auth } from '@/auth'
import NotificationModel from '@/models/NotificationModel'

const getNotificationsAction = async () => {
  try {
    const session = await auth()

    let notification = []
    if (session?.user.role === 'admin')
      notification = await NotificationModel.getNotifications()
    else
      notification =
        await NotificationModel.getPublicAndUserNotificationsByUserId(
          session?.user.id || ''
        )

    console.log({ getNotificationsAction: 'success' })

    return {
      success: true,
      data: notification,
    }
  } catch (error) {
    console.log({ getNotificationsAction: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getNotificationsAction
