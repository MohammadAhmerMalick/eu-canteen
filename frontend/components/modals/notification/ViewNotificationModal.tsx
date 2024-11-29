import { useCallback, useEffect, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import notificationsTable from '@/database/schema/notificationsSchema'
import makeNotificationReadAction from '@/actions/notification/makeNotificationReadAction'

interface ViewNotificationModalProp {
  onClose(): any
  notification: typeof notificationsTable.$inferInsert
}

const ViewNotificationModal = ({
  onClose,
  notification,
}: ViewNotificationModalProp) => {
  const { updateNotification } = useStore((state) => state)

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const makeNotificationReadA = useCallback(() => {
    updateNotification({ ...notification, isRead: true })
    makeNotificationReadAction(notification.id || '')
  }, [notification, updateNotification])

  useEffect(() => {
    if (!notification.isRead) makeNotificationReadA()
  }, [notification.id, notification.isRead, makeNotificationReadA])

  return (
    <div
      aria-hidden
      onClick={onContainerClick}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-neutral-900/40 p-3 backdrop-blur-sm md:p-4"
    >
      <div
        className={classnames(
          'grid max-h-full w-full max-w-3xl gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-lg md:mt-0 md:p-6'
        )}
      >
        <h1 className="text-lg font-semibold">Notification</h1>
        <p className="text-sm">{notification.message}</p>

        <Button className="ml-auto w-max !py-1" onPress={() => onClose()}>
          Close
        </Button>
      </div>
    </div>
  )
}

export default ViewNotificationModal
