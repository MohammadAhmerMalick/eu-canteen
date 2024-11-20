import { toast } from 'react-toastify'
import { FormEvent, useState, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import usersTable from '@/database/schema/usersSchema'
import updateUserAction from '@/actions/updateUserAction'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'

interface EditUserModalProp {
  onClose(): any
  student: typeof usersTable.$inferInsert
}

const EditUserModal = ({ onClose, student }: EditUserModalProp) => {
  const { updateUser } = useStore((state) => state)

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const [password, setPassword] = useState('')
  const [name, setName] = useState(student.name)
  const [image, setImage] = useState<File | ''>('')
  const [email, setEmail] = useState(student.email)
  const [whatsapp, setWhatsapp] = useState(student.whatsapp)
  const [matricola, setMatricola] = useState(student.matricola)
  const [approved, setApproved] = useState(!!student.approved)
  const [idCardBackImage, setIdCardBackImage] = useState<File | ''>('')
  const [idCardFrontImage, setIdCardFrontImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', student.id || '')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('image', image)
    formData.append('password', password)
    formData.append('whatsapp', whatsapp)
    formData.append('matricola', matricola)
    formData.append('idCardBackImage', idCardBackImage)
    formData.append('idCardFrontImage', idCardFrontImage)
    formData.append('approved', approved ? 'approved' : '')

    const { success, message, codeMessage, data } =
      await updateUserAction(formData)
    if (success) {
      updateUser(data[0])
      toast.success('Student updated')
      onClose()
    } else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
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
            placeholder="email@campus.unimib.it"
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
          <Input
            id="password"
            value={password}
            onChange={({ value }) => setPassword(value)}
            labelText="Password"
            placeholder="✳✳✳✳✳✳✳✳✳✳"
            labelClassName="text-sm"
          />

          <div>
            <p>Images</p>
            <label
              htmlFor="profileImage"
              className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
            >
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="absolute left-10 w-1 opacity-0"
                onChange={({ target }) => setImage(target.files?.[0] || '')}
              />
              <span className="text-primary">
                <AiOutlinePaperClip />
              </span>
              Upload Profile Image
              {image ? (
                <span className="text-green-600">
                  <HiBadgeCheck />
                </span>
              ) : (
                ''
              )}
            </label>
            <label
              htmlFor="idCardFront"
              className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
            >
              <input
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
              Upload ID Care Front Side
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
              Upload ID Care Back Side
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

            <div className="mt-1 text-xs text-neutral-500">
              <p className="mb-2">
                Checking this means user profile will automatically be active
              </p>
              <label htmlFor="approve" className="me-3 inline-flex gap-2">
                <input
                  required
                  type="radio"
                  name="approved"
                  id="approve"
                  checked={approved}
                  onChange={() => setApproved(true)}
                />
                Approve
              </label>
              <label htmlFor="pending" className="me-3 inline-flex gap-2">
                <input
                  required
                  type="radio"
                  name="approved"
                  id="pending"
                  checked={!approved}
                  onChange={() => setApproved(false)}
                />
                Pending
              </label>
            </div>
          </div>
        </div>
        <Button className="ml-auto w-max !py-1">Update User</Button>
      </form>
    </div>
  )
}

export default EditUserModal
