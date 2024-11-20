'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import loginAction from '@/actions/loginAction'

const LoginPage = () => {
  const [email, setEmail] = useState('asad@compus.unimib.it')
  const [password, setPassword] = useState('123123123')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success, message, data } = await loginAction({ email, password })
    if (success) {
      if (data.role === 'admin') redirect('/admin/students')
      if (data.role === 'student') redirect('/student')
      redirect('/')
    }

    toast.error(message)
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
