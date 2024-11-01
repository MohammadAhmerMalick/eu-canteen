'use client'

import Image from 'next/image'

import Button from '@/components/Button'
import Input from '@/components/common/Input'

const LoginPage = () => {
  return (
    <main className="flex h-dscreen items-center justify-center bg-primary-light p-2">
      <div className="grid w-full max-w-md gap-3 rounded-3xl border border-primary-light bg-white p-6 shadow-lg md:p-10">
        <Image
          height={90}
          width={90}
          src="/images/logo.svg"
          alt="Poolaster"
          className="mx-auto w-20"
        />
        <h1 className="text-lg font-bold">Login</h1>
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
          id="password"
          type="password"
          onChange={() => {}}
          labelText="Password"
          placeholder="✳✳✳✳✳✳✳✳✳✳"
          labelClassName="text-sm"
        />
        <p className="text-right text-sm text-neutral-500">Forgot Password?</p>
        <Button className="mt-4">Login</Button>
        <p className="text-center text-sm font-light">
          Don&apos;t have and account yet?{' '}
          <a href="register" className="font-semibold">
            Register for free
          </a>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
