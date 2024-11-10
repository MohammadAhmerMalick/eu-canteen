'use server'

import NotificationModel from '@/models/NotificationModel'

const insertNotificationAction = async (formData: FormData) => {
  const message = formData.get('message') as string

  if (!message)
    return {
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  const newNotification = await NotificationModel.createNotification({
    message,
    userId: '13eee89e-fb6f-48bc-b997-dd54eb440544',
  })

  return {
    success: true,
    data: newNotification,
    message: 'Notification created',
    codeMessage: 'notification_created',
  }
}

export default insertNotificationAction
