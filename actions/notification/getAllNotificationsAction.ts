'use server'

import NotificationModel from '@/models/NotificationModel'

const getAllNotificationsAction = async () => {
  try {
    const notification = await NotificationModel.getAllNotifications()

    console.log({ getAllNotificationsAction: 'success' })

    return {
      success: true,
      data: notification,
    }
  } catch (error) {
    console.log({ getAllNotificationsAction: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getAllNotificationsAction
