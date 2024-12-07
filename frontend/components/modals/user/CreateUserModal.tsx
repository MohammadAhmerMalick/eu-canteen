import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import insertUserAction from '@/actions/insertUserAction'
import HiBadgeCheck from '@/components/icons/HiBadgeCheck'
import ModalContainer from '@/components/common/ModalContainer'
import AiOutlinePaperClip from '@/components/icons/AiOutlinePaperClip'

interface CreateUserModalProp {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CreateUserModal = ({ isOpen, setOpen }: CreateUserModalProp) => {
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [matricola, setMatricola] = useState('')
  const [image, setImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('image', image)
    formData.append('whatsapp', whatsapp)
    formData.append('matricola', matricola)

    const { success, message, codeMessage } = await insertUserAction(formData)

    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllStudents'] })
      toast.success('User created successfully')
      setOpen(false)
    } else if (codeMessage === 'user_already_exist')
      toast.warn(
        'Your request is aready in pending state, contact admin for further information'
      )
    else if (codeMessage === 'fields_are_missing') toast.warn(message)
    else if (codeMessage === 'must_be_unimib_email') toast.error(message)
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
