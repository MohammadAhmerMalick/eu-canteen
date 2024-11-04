'use client'

import Link from 'next/link'
import Image from 'next/image'

import Button from '@/components/Button'
import Input from '@/components/common/Input'

const SignupPage = () => {
  return (
    <main className="flex h-dscreen items-center justify-center bg-primary-light p-2">
      <div className="grid w-full max-w-md gap-3 rounded-3xl border border-primary-light bg-white p-6 shadow-lg md:p-10">
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
          value=""
          id="name"
          labelText="Full Name"
          onChange={() => {}}
          labelClassName="text-sm"
          placeholder="John Doe"
        />
        <Input
          value=""
          id="email"
          type="email"
          labelText="Email"
          onChange={() => {}}
          labelClassName="text-sm"
          placeholder="email@compas.unimib.it"
        />
        <Input
          value=""
          id="whatsapp"
          onChange={() => {}}
          labelText="Whatsapp Number"
          placeholder="+39000000000"
          labelClassName="text-sm"
        />
        <Input
          value=""
          id="matricola"
          onChange={() => {}}
          labelText="Matricola Number"
          placeholder="✳✳✳✳✳✳✳✳✳✳"
          labelClassName="text-sm"
        />

        <div>
          <p>Attach You University Id Card</p>
          <p className="text-xs text-neutral-500">Upload Front</p>
          <p className="text-xs text-neutral-500">Upload Back</p>
        </div>

        <Button className="mt-4">Request For Register</Button>
        <p className="text-center text-sm font-light">
          Alredy have an account?{' '}
          <a href="login" className="font-semibold">
            Login
          </a>
        </p>
      </div>
    </main>
  )
}

export default SignupPage
