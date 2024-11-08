// import { toast } from 'react-toastify'
import { FormEvent, useState, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
// import insertUserAction from '@/actions/insertUserAction'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import usersTable from '@/database/schema/usersSchema'

interface ModalProp {
  onClose(): any
  student: typeof usersTable.$inferInsert
}

const Modal = ({ onClose, student }: ModalProp) => {
  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const [name, setName] = useState(student.name)
  const [email, setEmail] = useState(student.email)
  const [whatsapp, setWhatsapp] = useState(student.whatsapp)
  const [matricola, setMatricola] = useState(student.matricola)
  const [idCardBackImage, setIdCardBackImage] = useState<File | ''>('')
  const [idCardFrontImage, setIdCardFrontImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // return

    // const formData = new FormData(e.currentTarget)
    // formData.append('name', name)
    // formData.append('email', email)
    // formData.append('whatsapp', whatsapp)
    // formData.append('matricola', matricola)
    // formData.append('idCardBackImage', idCardBackImage)
    // formData.append('idCardFrontImage', idCardFrontImage)

    // if (idCardBackImage && idCardFrontImage) {
    //   const { success, message, codeMessage } = await insertUserAction(formData)

    //   if (success)
    //     toast.success('Your request has been submitted for the review')
    //   else if (codeMessage === 'user_already_exist')
    //     toast.warn(
    //       'Your request is aready in pending state, contact admin for further information'
    //     )
    //   else if (codeMessage === 'fields_are_missing') toast.warn(message)
    //   else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    //   else
    //     toast.error(
    //       'Unable to handle request right now, please contact to admin'
    //     )
    // }
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
        <h1 className="text-lg font-semibold">Update User</h1>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            id="name"
            value={name}
            labelText="Full Name"
            onChange={({ value }) => setName(value)}
            labelClassName="text-sm"
            placeholder="Asad Khan"
          />
          <Input
            isRequired
            id="email"
            type="email"
            value={email}
            labelText="Email"
            onChange={({ value }) => setEmail(value)}
            labelClassName="text-sm"
            placeholder="email@compus.unimib.it"
          />
          <Input
            isRequired
            onlyNumber
            id="whatsapp"
            value={whatsapp}
            onChange={({ value }) => setWhatsapp(value)}
            labelText="WhatsApp Number"
            placeholder="39000000000"
            labelClassName="text-sm"
          />
          <Input
            isRequired
            onlyNumber
            id="matricola"
            value={matricola}
            onChange={({ value }) => setMatricola(value)}
            labelText="Matricola Number"
            placeholder="✳✳✳✳✳✳✳✳✳✳"
            labelClassName="text-sm"
          />

          <div>
            <p>University Id Card</p>
            <label
              htmlFor="idCardFront"
              className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
            >
              <input
                required
                type="file"
                id="idCardFront"
                accept="image/*"
                className="absolute left-10 w-1 opacity-0"
                onChange={({ target }) =>
                  setIdCardFrontImage(target.files?.[0] || '')
                }
              />
              <span className="text-primary">
                <AiOutlinePaperClip />
              </span>
              Upload Front
              {idCardFrontImage ? (
                <span className="text-green-600">
                  <HiBadgeCheck />
                </span>
              ) : (
                ''
              )}
            </label>
            <label
              htmlFor="idCardBack"
              className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
            >
              <input
                required
                type="file"
                id="idCardBack"
                accept="image/*"
                className="absolute left-10 w-1 opacity-0"
                onChange={({ target }) =>
                  setIdCardBackImage(target.files?.[0] || '')
                }
              />
              <span className="text-primary">
                <AiOutlinePaperClip />
              </span>
              Upload Back
              {idCardBackImage ? (
                <span className="text-green-600">
                  <HiBadgeCheck />
                </span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div>
            <p>Status:</p>

            <label
              htmlFor="linkCheckbox"
              className="mt-1 flex items-center gap-2 text-xs text-neutral-500"
            >
              <input
                required
                type="checkbox"
                id="linkCheckbox"
                checked={student.approved}
              />
              <span>
                Checking this means user profile will automatically be active
              </span>
            </label>
          </div>
        </div>
        <Button className="ml-auto w-max !py-1">Update User</Button>
      </form>
    </div>
  )
}

export default Modal
