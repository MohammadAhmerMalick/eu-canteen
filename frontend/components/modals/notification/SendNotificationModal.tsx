// import { toast } from 'react-toastify'
import { FormEvent, useState, type MouseEvent } from 'react'

import { classnames } from '@/utils'
// import { useStore } from '@/store/provider'
// import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
// import insertNotificationAction from '@/actions/notification/insertNotificationAction'
import Textarea from '@/components/common/Textarea'

interface SendNotificationModalProp {
  onClose(): any
}

const SendNotificationModal = ({ onClose }: SendNotificationModalProp) => {
  // const { insertCategory } = useStore((state) => state)

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const [message, setMessage] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const { success, message, codeMessage, data } =
    //   await insertNotificationAction({
    //     message,
    //   })

    // if (success) {
    //   insertCategory(data[0])
    //   toast.success('Notification sent successfully')
    //   onClose()
    // } else if (codeMessage === 'fields_are_missing') toast.warn(message)
    // else
    //   toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <div
      aria-hidden
      onClick={onContainerClick}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-neutral-900/40 p-3 backdrop-blur-sm md:p-4"
    >
      <form
        onSubmit={onSubmit}
        className={classnames(
          'grid max-h-full w-full max-w-3xl gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-lg md:mt-0 md:p-6'
        )}
      >
        <h1 className="text-lg font-semibold">Notification</h1>
        <div className="grid grid-cols-2 gap-4">
          <Textarea
            isRequired
            id="message"
            value={message}
            labelText="Message"
            labelClassName="text-sm"
            placeholder="Hi everyone"
            onChange={({ value }) => setMessage(value)}
          />
        </div>
        <Button className="ml-auto w-max !py-1">Send Notification</Button>
      </form>
    </div>
  )
}

export default SendNotificationModal
