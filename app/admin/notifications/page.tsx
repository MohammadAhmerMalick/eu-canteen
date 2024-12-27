'use client'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import Loading from '@/components/common/Loading'
import DataError from '@/components/common/DataError'
import AiOutlineEye from '@/components/icons/AiOutlineEye'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import type { Notification } from '@/database/schema/notificationsSchema'
import getNotificationsAction from '@/actions/notification/getNotificationsAction'
import ViewNotificationModal from '@/components/modals/notification/ViewNotificationModal'
import SendNotificationModal from '@/components/modals/notification/SendNotificationModal'
import softDeleteNotificationAction from '@/actions/notification/softDeleteNotificationAction'

const dataErrorMessage = 'Unable to load notifications'

const NotificationsPage = () => {
  const { notifications, deleteNotification, setNotifications } = useStore(
    (state) => state
  )

  const [isSendModalVisible, setIsSendModalVisible] = useState(false)
  const [viewModalDate, setViewModalData] = useState<Notification | null>(null)

  const { isPending, error, refetch } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: async () => {
      const { data, success } = await getNotificationsAction()
      if (success) setNotifications(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const onDelete = async (id: string) => {
    const { success } = await softDeleteNotificationAction(id)

    if (success) {
      deleteNotification(id)
      toast.success('Notification Deleted')
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {viewModalDate && (
        <ViewNotificationModal
          isOpen={!!viewModalDate}
          notification={viewModalDate}
          setOpen={() => setViewModalData(null)}
        />
      )}
      <SendNotificationModal
        isOpen={isSendModalVisible}
        setOpen={setIsSendModalVisible}
      />
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
              <Button
                className="mx-auto flex items-center gap-1 rounded-lg"
                onPress={() => setIsSendModalVisible(true)}
              >
                <FaPlus /> Notification
              </Button>
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
