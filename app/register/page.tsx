'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import AiOutlinePaperClip from '@/components/icons/AiOutlinePaperClip'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [matricola, setMatricola] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setWhatsapp('')
    setMatricola('')
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    resetForm()
    toast.success('Your request has been submitted for the review')
    redirect('/')
  }

  return (
    <main className="flex h-dscreen items-center justify-center bg-primary-light p-2">
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
        <h1 className="text-lg font-bold">Registration</h1>
        <Input
          isRequired
          id="name"
          value={name}
          labelText="Full Name"
          onChange={({ value }) => setName(value)}
          labelClassName="text-sm"
          placeholder="John Doe"
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
          id="whatsapp"
          value={whatsapp}
          onChange={({ value }) => setWhatsapp(value)}
          labelText="Whatsapp Number"
          placeholder="+39000000000"
          labelClassName="text-sm"
        />
        <Input
          isRequired
          id="matricola"
          value={matricola}
          onChange={({ value }) => setMatricola(value)}
          labelText="Matricola Number"
          placeholder="✳✳✳✳✳✳✳✳✳✳"
          labelClassName="text-sm"
        />

        <div>
          <p>Attach You University Id Card</p>
          <p className="flex items-center gap-1 text-xs text-neutral-500">
            <AiOutlinePaperClip /> Upload Front
          </p>
          <p className="flex items-center gap-1 text-xs text-neutral-500">
            <AiOutlinePaperClip /> Upload Back
          </p>
        </div>

        <div>
          <p>Consents and Terms of Use:</p>
          <p className="text-xs text-neutral-500">
            <Link className="text-blue-800" href="privacy-policy">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link className="text-blue-800" href="terms-and-conditions">
              Terms and conditions
            </Link>{' '}
            of service
          </p>

          <div className="flex items-center">
            <label className="flex items-center gap-2 text-xs text-neutral-500">
              <input id="link-checkbox" type="checkbox" required />
              <span>I consent to the processing of above data</span>
            </label>
          </div>
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
