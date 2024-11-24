'use client'

import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import updateMyProfileAction from '@/actions/updateMyProfileAction'

const ProfilePage = () => {
  const { auth, updateUser } = useStore((state) => state)

  if (!auth) redirect('/')

  const [name, setName] = useState(auth.name)
  const [image, setImage] = useState<File | ''>('')
  const [email, setEmail] = useState(auth.email)
  const [whatsapp, setWhatsapp] = useState(auth.whatsapp)
  const [matricola, setMatricola] = useState(auth.matricola)
  const [idCardBackImage, setIdCardBackImage] = useState<File | ''>('')
  const [idCardFrontImage, setIdCardFrontImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    formData.append('whatsapp', whatsapp)
    formData.append('idCardBackImage', idCardBackImage)
    formData.append('idCardFrontImage', idCardFrontImage)

    const { success, message, codeMessage, data } =
      await updateMyProfileAction(formData)
    if (success) {
      updateUser(data[0])
      toast.success('Student updated')
    } else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <form
      onSubmit={onSubmit}
      className={classnames('grid max-h-full w-full max-w-3xl gap-4')}
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
          readOnly
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
          readOnly
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
      </div>
      <Button className="ml-auto w-max !py-1">Update My Profile</Button>
    </form>
  )
}

export default ProfilePage
