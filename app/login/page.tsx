'use client'

import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    resetForm()
    redirect('/')
    // toast.success('Your request has been submitted for the review')
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
        <h1 className="text-lg font-semibold">Login</h1>
        <Input
          isRequired
          id="email"
          type="email"
          value={email}
          labelText="Email"
          onChange={({ value }) => setEmail(value)}
          labelClassName="text-sm"
          placeholder="email@compas.unimib.it"
        />
        <Input
          isRequired
          id="password"
          type="password"
          value={password}
          onChange={({ value }) => setPassword(value)}
          labelText="Password"
          placeholder="✳✳✳✳✳✳✳✳✳✳"
          labelClassName="text-sm"
        />
        <p className="ml-auto w-max cursor-pointer text-sm text-neutral-500">
          Forgot Password?
        </p>
        <Button
          onClick={() => localStorage.setItem('isLoggedIn', 'true')}
          className="mt-4"
        >
          Login
        </Button>
        <p className="text-center text-sm font-light">
          Don&apos;t have and account yet?{' '}
          <Link href="register" className="font-semibold">
            Register for free
          </Link>
        </p>
      </form>
    </main>
  )
}

export default LoginPage
