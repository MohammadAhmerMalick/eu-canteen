'use server'

import NotificationModel from '@/models/NotificationModel'

const deleteNotificationAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string

    const res = await NotificationModel.deleteNotification(id)

    console.log({ deleteNotificationAction: 'success' })

    return {
      success: true,
      data: res,
      message: 'Notification deleted',
      codeMessage: 'notification_deleted',
    }
  } catch (error) {
    console.log({ deleteNotificationAction: error })

    return {
      success: false,
      data: {},
      message: 'Unable to delete notification',
      codeMessage: 'server_error',
    }
  }
}

export default deleteNotificationAction
