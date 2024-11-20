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

  const [email, setEmail] = useState('asad@campus.unimib.it')
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
      if (auth.role === 'admin') redirect('/admin/students')
      if (auth.role === 'student') redirect('/student')
      redirect('/')
    }
  }, [authStatus, auth])

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
          className="mt-4"
          disabled={authStatus === 'loading'}
          onClick={() => localStorage.setItem('isLoggedIn', 'true')}
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
