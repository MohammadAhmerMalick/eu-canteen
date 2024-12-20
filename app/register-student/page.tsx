'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/components/icons/HiBadgeCheck'
import AuthLayoutSection from '@/sections/AuthLayoutSection'
import insertUserAction from '@/actions/user/insertUserAction'
import AiOutlinePaperClip from '@/components/icons/AiOutlinePaperClip'
import RegistrationSuccess from '@/components/modals/user/RegistrationSuccess'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [matricola, setMatricola] = useState('')
  const [image, setImage] = useState<File | ''>('')
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)

  const resetForm = () => {
    setName('')
    setEmail('')
    setWhatsapp('')
    setMatricola('')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('image', image)
    formData.append('whatsapp', whatsapp)
    formData.append('matricola', matricola)

    const { success, message } = await insertUserAction(formData)
    if (success) {
      toast.success('Your request has been submitted for the review')
      resetForm()
      setIsRegistrationSuccess(true)
    } else if (message) toast.warn(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  const onSuccessModalClose = () => {
    setIsRegistrationSuccess(false)
    redirect('/')
  }

  const { mutate, isPending } = useMutation({
    mutationFn: onSubmit,
  })

  return (
    <AuthLayoutSection title="Student Registration">
      <RegistrationSuccess
        isOpen={isRegistrationSuccess}
        setOpen={() => onSuccessModalClose()}
      >
        <div className="font-normal text-neutral-500">
          <p>{name} please wait for admin approval.</p>
          <p>You will receive the login details shortly.</p>
        </div>
      </RegistrationSuccess>
      <form onSubmit={mutate} className="grid gap-3">
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
          labelText="Student Email"
          labelClassName="text-sm"
          placeholder="student@campus.unimib.it"
          onChange={({ value }) => setEmail(value)}
        />
        <Input
          isRequired
          onlyNumber
          id="whatsapp"
          value={whatsapp}
          labelClassName="text-sm"
          placeholder="393445474757"
          labelText="WhatsApp Number"
          onChange={({ value }) => setWhatsapp(value)}
        />
        <Input
          isRequired
          onlyNumber
          id="matricola"
          value={matricola}
          labelClassName="text-sm"
          labelText="Matricola Number"
          placeholder="Enter Your Matricola ID"
          onChange={({ value }) => setMatricola(value)}
        />

        <div>
          <p>Attach Your Profile Image (Optional)</p>
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

        <div>
          <p className="text-sm font-semibold">Consents and Terms of Use:</p>
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
            <span>I consent to the processing of the above data</span>
          </label>
        </div>

        <Button className="mt-4" isDisabled={isPending}>
          Request For Register
        </Button>
        <p className="mt-2 mt-4 text-center text-sm font-normal text-neutral-500">
          Already have an account?{' '}
          <Link
            href="login"
            className="font-semibold text-black duration-150 hover:text-primary"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayoutSection>
  )
}

export default SignupPage
