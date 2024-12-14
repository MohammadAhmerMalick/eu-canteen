'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react'
import { useEffect, useState, type FormEvent } from 'react'

import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import AuthLayoutSection from '@/sections/AuthLayoutSection'

const LoginPage = () => {
  const { auth, authStatus, setAuthStatus } = useStore((state) => state)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthStatus('loading')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      redirectTo: '/',
    })

    if (res?.error) {
      setAuthStatus('unauthenticated')
      toast.error('Credentials are not valid')

      return
    }

    const session = await getSession()

    setAuthStatus('authenticated')
    if (session?.user.role === 'admin') redirect(`/${session?.user.role}`)
    else redirect('/student/menu')
  }

  useEffect(() => {
    if (auth?.role)
      if (auth.role === 'admin') redirect(`/${auth.role}`)
      else redirect('/student/menu')
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
          Don&apos;t have an account yet?{' '}
          <Link href="register" className="font-semibold text-black">
            Register for Free
          </Link>
        </p>
      </form>
    </AuthLayoutSection>
  )
}

export default LoginPage
