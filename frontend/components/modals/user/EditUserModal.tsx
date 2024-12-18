import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { CONSTANTS } from '@/utils'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import type { User } from '@/database/schema/usersSchema'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import updateUserAction from '@/actions/user/updateUserAction'
import ModalContainer from '@/components/common/ModalContainer'

interface EditUserModalProp {
  student: User
  isOpen: boolean
  isPlayer: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const EditUserModal = ({
  isOpen,
  student,
  isPlayer,
  setOpen,
}: EditUserModalProp) => {
  const queryClient = useQueryClient()

  const [password, setPassword] = useState('')
  const [name, setName] = useState(student.name)
  const [image, setImage] = useState<File | ''>('')
  const [email, setEmail] = useState(student.email)
  // const [credit, setCredit] = useState(student.credit || '')
  const [whatsapp, setWhatsapp] = useState(student.whatsapp)
  const [matricola, setMatricola] = useState(student.matricola)
  const [approved, setApproved] = useState(!!student.approved)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', student.id || '')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('image', image)
    // formData.append('credit', credit)
    formData.append('password', password)
    formData.append('whatsapp', whatsapp)
    formData.append('matricola', matricola)
    formData.append('approved', approved ? 'approved' : '')

    if (isPlayer) formData.append('userType', CONSTANTS.roleName.player)

    const { success } = await updateUserAction(formData)
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllStudents'] })
      toast.success('Student updated')
      setOpen(false)
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className="grid gap-4">
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
          {/* <Input
            onlyNumber
            id="credit"
            value={credit}
            placeholder="123"
            labelText="Credit"
            labelClassName="text-sm"
            onChange={({ value }) => setCredit(value)}
          /> */}
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
          {!isPlayer && (
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
          )}
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
    </ModalContainer>
  )
}

export default EditUserModal
