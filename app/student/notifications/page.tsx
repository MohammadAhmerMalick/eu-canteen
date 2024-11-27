'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import DataError from '@/components/common/DataError'
import AiOutlineEye from '@/components/icons/AiOutlineEye'
import notificationsTable from '@/database/schema/notificationsSchema'
import getNotificationsAction from '@/actions/notification/getNotificationsAction'
import ViewNotificationModal from '@/components/modals/notification/ViewNotificationModal'

const dataErrorMessage = 'Unable to load notifications'

const NotificationsPage = () => {
  const { notifications, auth, setNotifications } = useStore((state) => state)

  const [viewModalDate, setViewModalData] = useState<
    typeof notificationsTable.$inferInsert | null
  >(null)

  const { isPending, error } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: async () => {
      const { data, success } = await getNotificationsAction()
      if (success) setNotifications(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

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
              Type
            </td>
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
                {auth?.id === notification.to?.[0] ? 'Private' : 'Public'}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                {new Date(notification.createdAt || '').toLocaleTimeString()}{' '}
                {new Date(notification.createdAt || '').toLocaleDateString()}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotificationsPage
