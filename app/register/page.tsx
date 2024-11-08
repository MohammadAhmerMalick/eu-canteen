'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import insertUserAction from '@/actions/insertUserAction'
import HiBadgeCheck from '@/components/icons/HiBadgeCheck'
import AiOutlinePaperClip from '@/components/icons/AiOutlinePaperClip'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [matricola, setMatricola] = useState('')
  const [idCardBackImage, setIdCardBackImage] = useState<File | ''>('')
  const [idCardFrontImage, setIdCardFrontImage] = useState<File | ''>('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setWhatsapp('')
    setMatricola('')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('whatsapp', whatsapp)
    formData.append('matricola', matricola)
    formData.append('idCardBackImage', idCardBackImage)
    formData.append('idCardFrontImage', idCardFrontImage)

    if (idCardBackImage && idCardFrontImage) {
      const { success, message, codeMessage } = await insertUserAction(formData)

      if (success) {
        toast.success('Your request has been submitted for the review')
        resetForm()
        redirect('/')
      } else if (codeMessage === 'user_already_exist')
        toast.warn(
          'Your request is aready in pending state, contact admin for further information'
        )
      else if (codeMessage === 'fields_are_missing') toast.warn(message)
      else if (codeMessage === 'must_be_unimib_email') toast.error(message)
      else
        toast.error(
          'Unable to handle request right now, please contact to admin'
        )
    }
  }

  return (
    <main className="flex min-h-dscreen items-center justify-center bg-primary-light p-2">
      <form
        onSubmit={onSubmit}
        className="grid w-full max-w-md gap-3 rounded-3xl border border-primary-light bg-white p-6 shadow-lg md:p-10"
      >
        <Link href="/">
          <Image
            height={90}
            width={90}
            src="/images/logo.svg"
            alt="Poolaster"
            className="mx-auto w-20"
          />
        </Link>
        <h1 className="text-lg font-semibold">Registration</h1>
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
          <p>Attach You University Id Card</p>
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
          <p>Consents and Terms of Use:</p>
          <p className="text-xs text-neutral-500">
            <Link className="text-primary underline" href="privacy-policy">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              className="text-primary underline"
              href="terms-and-conditions"
            >
              Terms and conditions
            </Link>{' '}
            of service
          </p>

          <label
            htmlFor="linkCheckbox"
            className="mt-1 flex items-center gap-2 text-xs text-neutral-500"
          >
            <input id="linkCheckbox" type="checkbox" required />
            <span>I consent to the processing of above data</span>
          </label>
        </div>

        <Button className="mt-4">Request For Register</Button>
        <p className="text-center text-sm font-light">
          Alredy have an account?{' '}
          <Link href="login" className="font-semibold">
            Login
          </Link>
        </p>
      </form>
    </main>
  )
}

export default SignupPage
