'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'

import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import loginAction from '@/actions/loginAction'
import AuthLayoutSection from '@/sections/AuthLayoutSection'

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
    <AuthLayoutSection title="Login">
      <form onSubmit={onSubmit} className="grid gap-3">
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
    </AuthLayoutSection>
  )
}

export default LoginPage
