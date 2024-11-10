'use server'

import NotificationModel from '@/models/NotificationModel'

const softDeleteNotificationAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string

    const res = await NotificationModel.softDeleteNotification(id)

    console.log({ softDeleteNotificationAction: 'success' })

    return {
      success: true,
      data: res,
      message: 'Notification Deleted',
      codeMessage: 'notification_softDeleted',
    }
  } catch (error) {
    console.log({ softDeleteNotificationAction: error })

    return {
      success: false,
      data: {},
      message: 'Unable to delete notification',
      codeMessage: 'server_error',
    }
  }
}

export default softDeleteNotificationAction
