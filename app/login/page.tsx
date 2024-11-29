'use client'

import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'

import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import loginAction from '@/actions/loginAction'

const LoginPage = () => {
  const { auth, authStatus, setAuthStatus } = useStore((state) => state)

  const [email, setEmail] = useState('johndoe@campus.unimib.it')
  const [password, setPassword] = useState('123123123')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginAction({ email, password })
    setAuthStatus('loading')

    setTimeout(() => {
      window.location.href = '/login'
    }, 3000)
  }

  useEffect(() => {
    if (auth?.role) {
      if (auth.role === 'admin') redirect(`/${auth.role}`)
      if (auth.role === 'student') redirect('/student')
      redirect('/')
    }
  }, [authStatus, auth])

  return (
    <main className="flex min-h-dscreen items-center justify-center bg-[url('/images/backgrounds/auth-bg.jpg')] p-2">
      <form
        onSubmit={onSubmit}
        className="grid w-full max-w-md gap-3 rounded-3xl border border-primary-light bg-white p-6 shadow-lg md:p-10 md:pb-6"
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
        <h1 className="mb-4 text-xl font-semibold">Login</h1>
        <Input
          isRequired
          id="email"
          type="email"
          value={email}
          labelText="University Email"
          onChange={({ value }) => setEmail(value)}
          labelClassName="text-sm"
          placeholder="student@campus.unimib.it"
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
        <Button className="mt-4" isDisabled={authStatus === 'loading'}>
          Login
        </Button>
        <p className="mt-2 text-center text-sm font-normal text-neutral-500">
          Don&apos;t have and account yet?{' '}
          <Link href="register" className="font-semibold text-black">
            Register for Free
          </Link>
        </p>
      </form>
    </main>
  )
}

export default LoginPage
