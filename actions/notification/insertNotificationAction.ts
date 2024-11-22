'use server'

import { auth } from '@/auth'
import NotificationModel from '@/models/NotificationModel'

interface insertNotificationActionProps {
  message: string
  to: string[]
}

const insertNotificationAction = async ({
  message,
  to,
}: insertNotificationActionProps) => {
  if (!(message && to))
    return {
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  const session = await auth()

  const newNotification = await NotificationModel.createNotification({
    to,
    message,
    from: session?.user.id,
  })

  return {
    success: true,
    data: newNotification,
    message: 'Notification created',
    codeMessage: 'notification_created',
  }
}

export default insertNotificationAction
