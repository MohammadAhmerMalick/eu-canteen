'use server'

import NotificationModel from '@/models/NotificationModel'

const getNotificationsAction = async () => {
  try {
    const notification = await NotificationModel.getNotifications()

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
