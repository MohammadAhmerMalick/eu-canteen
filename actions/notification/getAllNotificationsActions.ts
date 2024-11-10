'use server'

import NotificationModel from '@/models/NotificationModel'

const getAllNotificationsActions = async () => {
  try {
    const notification = await NotificationModel.getAllNotifications()

    console.log({ getAllNotificationsActions: 'success' })

    return {
      success: true,
      data: notification,
    }
  } catch (error) {
    console.log({ getAllNotificationsActions: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getAllNotificationsActions
