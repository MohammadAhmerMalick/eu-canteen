import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { CONSTANTS } from '@/utils'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/components/icons/HiBadgeCheck'
import insertUserAction from '@/actions/user/insertUserAction'
import ModalContainer from '@/components/common/ModalContainer'
import AiOutlinePaperClip from '@/components/icons/AiOutlinePaperClip'

interface CreateUserModalProp {
  isOpen: boolean
  isPlayer?: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CreateUserModal = ({
  isOpen,
  setOpen,
  isPlayer = false,
}: CreateUserModalProp) => {
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [matricola, setMatricola] = useState('')
  const [image, setImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('image', image)
    formData.append('password', password)
    formData.append('whatsapp', whatsapp)
    formData.append('matricola', matricola)

    if (isPlayer) formData.append('userType', CONSTANTS.roleName.player)

    const { success, message } = await insertUserAction(formData)

    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllStudents'] })
      toast.success('User created successfully')
      setOpen(false)
    } else if (message) toast.warn(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <h1 className="text-lg font-semibold">Create User</h1>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            id="name"
            value={name}
            labelText="Full Name"
            placeholder="Asad Khan"
            labelClassName="text-sm"
            onChange={({ value }) => setName(value)}
          />
          <Input
            isRequired
            id="email"
            type="email"
            value={email}
            labelText="Email"
            labelClassName="text-sm"
            placeholder="email@campus.unimib.it"
            onChange={({ value }) => setEmail(value)}
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
            isRequired
            id="password"
            type="password"
            pattern=".{8,}"
            value={password}
            labelText="Password"
            placeholder="*********"
            labelClassName="text-sm"
            title="8 characters minimum"
            onChange={({ value }) => setPassword(value)}
          />

          {!isPlayer && (
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

          <label
            htmlFor="image"
            className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              className="absolute left-10 w-1 opacity-0"
              onChange={({ target }) => setImage(target.files?.[0] || '')}
            />
            <span className="text-primary">
              <AiOutlinePaperClip />
            </span>
            Upload Profile Picture
            {image ? (
              <span className="text-green-600">
                <HiBadgeCheck />
              </span>
            ) : (
              ''
            )}
          </label>
        </div>
        <Button className="ml-auto w-max !py-1">Create User</Button>
      </form>
    </ModalContainer>
  )
}

export default CreateUserModal
