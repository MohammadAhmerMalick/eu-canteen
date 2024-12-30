import { classnames } from '@/utils'
import Button from '@/components/common/Button'
import type { Notification } from '@/database/schema/notificationsSchema'

interface NotificationCellWidgetProps {
  notification: Notification
  onClick: () => void
}

const NotificationCellWidget = ({
  notification,
  onClick,
}: NotificationCellWidgetProps) => {
  return (
    <div
      className={classnames(
        'w-full rounded-lg border p-2 text-left',

        notification.isRead
          ? 'border-primary'
          : 'border-primary-light bg-primary-light'
      )}
    >
      <div className="flex gap-4">
        <p className="text-sm">{notification.message}</p>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-primary pt-2 text-xs">
        <Button className="!p-1 !px-2" onPress={onClick}>
          Show
        </Button>
        <p>
          {new Date(notification.createdAt || '').toLocaleTimeString()}{' '}
          {new Date(notification.createdAt || '').toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default NotificationCellWidget
