import { useCallback, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import type { Notification } from '@/database/schema/notificationsSchema'
import makeNotificationReadAction from '@/actions/notification/makeNotificationReadAction'
import ModalContainer from '@/components/common/ModalContainer'

interface ViewNotificationModalProp {
  isOpen: boolean
  notification: Notification
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ViewNotificationModal = ({
  isOpen,
  setOpen,
  notification,
}: ViewNotificationModalProp) => {
  const { updateNotification } = useStore((state) => state)

  const makeNotificationReadA = useCallback(() => {
    updateNotification({ ...notification, isRead: true })
    makeNotificationReadAction(notification.id || '')
  }, [notification, updateNotification])

  useEffect(() => {
    if (!notification.isRead) makeNotificationReadA()
  }, [notification.id, notification.isRead, makeNotificationReadA])

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <div className={classnames('grid gap-4')}>
        <h1 className="text-lg font-semibold">Notification</h1>
        <p className="text-sm">{notification.message}</p>

        <Button className="ml-auto w-max !py-1" onPress={() => setOpen(false)}>
          Close
        </Button>
      </div>
    </ModalContainer>
  )
}

export default ViewNotificationModal
