'use server'

import NotificationModel from '@/models/NotificationModel'

const getNotificationsActions = async () => {
  try {
    const notification = await NotificationModel.getNotifications()

    console.log({ getNotificationsActions: 'success' })

    return {
      success: true,
      data: notification,
    }
  } catch (error) {
    console.log({ getNotificationsActions: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getNotificationsActions
