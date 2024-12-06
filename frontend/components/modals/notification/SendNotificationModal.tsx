import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import Textarea from '@/components/common/Textarea'
import ModalContainer from '@/components/common/ModalContainer'
import insertNotificationAction from '@/actions/notification/insertNotificationAction'

interface SendNotificationModalProp {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SendNotificationModal = ({
  isOpen,
  setOpen,
}: SendNotificationModalProp) => {
  const { insertNotification } = useStore((state) => state)

  const [notificationMessage, setMessage] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success, message, codeMessage, data } =
      await insertNotificationAction({
        to: ['general'],
        message: notificationMessage,
      })

    if (success) {
      insertNotification(data[0])
      toast.success('Notification sent successfully')
      setOpen(false)
    } else if (codeMessage === 'fields_are_missing') toast.warn(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className={classnames('grid gap-4')}>
        <h1 className="text-lg font-semibold">Notification</h1>
        <div className="grid gap-4">
          <Textarea
            isRequired
            id="message"
            labelText="Message"
            labelClassName="text-sm"
            placeholder="Hi everyone"
            value={notificationMessage}
            onChange={({ value }) => setMessage(value)}
          />
        </div>
        <Button className="ml-auto w-max !py-1">Send Notification</Button>
      </form>
    </ModalContainer>
  )
}

export default SendNotificationModal
