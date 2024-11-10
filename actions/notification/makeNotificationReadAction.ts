'use server'

import NotificationModel from '@/models/NotificationModel'

const makeNotificationReadAction = async (id: string) => {
  try {
    const res = await NotificationModel.makeNotificationRead(id)

    console.log({ makeNotificationReadAction: 'success' })

    return {
      success: true,
      data: res,
      message: 'Notification Read',
      codeMessage: 'notification_softRead',
    }
  } catch (error) {
    console.log({ makeNotificationReadAction: error })

    return {
      success: false,
      data: {},
      message: 'Unable to read notification',
      codeMessage: 'server_error',
    }
  }
}

export default makeNotificationReadAction
