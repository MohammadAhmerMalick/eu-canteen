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
  setOpen: Dispatch<SetStateAction<boolean>>
}

const EditUserModal = ({ isOpen, student, setOpen }: EditUserModalProp) => {
  const queryClient = useQueryClient()

  const [password, setPassword] = useState('')
  const [name, setName] = useState(student.name)
  const [image, setImage] = useState<File | ''>('')
  const [email, setEmail] = useState(student.email)
  const [whatsapp, setWhatsapp] = useState(student.whatsapp)
  const [matricola, setMatricola] = useState(student.matricola)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', student.id || '')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('image', image)
    formData.append('password', password)
    formData.append('whatsapp', whatsapp)
    formData.append('userType', student.roleName || '')
    formData.append('matricola', matricola)

    if (student.roleName === CONSTANTS.roleName.player)
      formData.append('userType', CONSTANTS.roleName.player)

    const { success } = await updateUserAction(formData)
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllStudents'] })
      toast.success('User updated')
      setOpen(false)
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <h1 className="text-lg font-semibold">Update User</h1>
        <div className="grid gap-4 md:grid-cols-2">
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
            pattern=".{10,16}"
            labelClassName="text-sm"
            placeholder="39000000000"
            labelText="WhatsApp Number"
            title="10 to 16 characters"
            onChange={({ value }) => setWhatsapp(value)}
          />
          <Input
            id="password"
            pattern=".{8,}"
            value={password}
            labelText="Password"
            placeholder="✳✳✳✳✳✳✳✳✳✳"
            labelClassName="text-sm"
            title="8 characters minimum"
            onChange={({ value }) => setPassword(value)}
          />
          {student.roleName === CONSTANTS.roleName.student && (
            <Input
              isRequired
              onlyNumber
              id="matricola"
              pattern=".{6}"
              value={matricola}
              placeholder="✳✳✳✳✳✳✳✳✳✳"
              labelClassName="text-sm"
              labelText="Matricola Number"
              title="Matricola must be of 6 characters"
              onChange={({ value }) => setMatricola(value)}
            />
          )}
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
        </div>
        <Button className="ml-auto w-max !py-1">Update User</Button>
      </form>
    </ModalContainer>
  )
}

export default EditUserModal
