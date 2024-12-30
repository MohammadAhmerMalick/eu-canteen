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
  try {
    if (!(message && to))
      return {
        data: [],
        success: false,
        message: 'All fields are required',
        codeMessage: 'fields_are_missing',
      }

    const session = await auth()

    const newNotification = await NotificationModel.createNotification({
      to,
      message,
      from: session?.user.id || to[0],
    })

    console.log({ insertNotificationAction: 'success' })

    return {
      success: true,
      data: newNotification,
      message: 'Notification created',
      codeMessage: 'notification_created',
    }
  } catch (error) {
    console.log({ insertNotificationAction: error })

    return {
      success: false,
      data: [],
      message: 'Notification not send',
      codeMessage: 'notification__not_sent',
    }
  }
}

export default insertNotificationAction
