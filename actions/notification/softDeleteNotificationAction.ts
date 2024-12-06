'use server'

import { auth } from '@/auth'
import NotificationModel from '@/models/NotificationModel'

const softDeleteNotificationAction = async (id: string) => {
  try {
    const session = await auth()
    if (session?.user.role !== 'admin')
      return {
        success: false,
        data: {},
      }

    const res = await NotificationModel.softDeleteNotification(id)

    console.log({ softDeleteNotificationAction: 'success' })

    return {
      success: true,
      data: res,
    }
  } catch (error) {
    console.log({ softDeleteNotificationAction: error })

    return {
      success: false,
      data: {},
    }
  }
}

export default softDeleteNotificationAction
