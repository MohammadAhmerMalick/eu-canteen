'use client'

import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'

import { useStore } from '@/store/provider'
import AiOutlineEye from '@/components/icons/AiOutlineEye'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import notificationsTable from '@/database/schema/notificationsSchema'
import getNotificationsAction from '@/actions/notification/getNotificationsAction'
import ViewNotificationModal from '@/components/modals/notification/ViewNotificationModal'
import softDeleteNotificationAction from '@/actions/notification/softDeleteNotificationAction'

const NotificationsPage = () => {
  const { notifications, setNotifications } = useStore((state) => state)

  const [viewModalDate, setViewModalData] = useState<
    typeof notificationsTable.$inferInsert | null
  >(null)

  const onDelete = async (id: string) => {
    const formData = new FormData()
    formData.append('id', id)

    const { success } = await softDeleteNotificationAction(formData)
    if (success) toast.success('Notification Deleted')
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  const getNotifications = useCallback(async () => {
    const { data } = await getNotificationsAction()
    setNotifications(data)
  }, [setNotifications])

  useEffect(() => {
    if (notifications.length) getNotifications()
  }, [getNotifications, notifications.length])

  return (
    <div>
      {viewModalDate && (
        <ViewNotificationModal
          notification={viewModalDate}
          onClose={() => setViewModalData(null)}
        />
      )}

      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Name</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Date & Time
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td className="border-b border-neutral-300 p-2">
                {notification.message}
              </td>

              <td className="border-b border-neutral-300 p-2 text-center">
                {new Date(notification.createdAt || '').toLocaleDateString()}{' '}
                {new Date(notification.createdAt || '').toLocaleTimeString()}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center font-semibold">
                {notification.isRead ? (
                  <p className="text-green-700">Read</p>
                ) : (
                  <p className="text-primary">Unread</p>
                )}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <button
                  onClick={() => setViewModalData(notification)}
                  className="mx-1 rounded-lg bg-green-200 p-2 text-lg text-green-600 shadow"
                >
                  <AiOutlineEye />
                </button>
                <button
                  onClick={() => onDelete(notification.id || '')}
                  className="mx-1 rounded-lg bg-red-200 p-2 text-lg text-red-600 shadow"
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotificationsPage
