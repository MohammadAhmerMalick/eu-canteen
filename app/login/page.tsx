'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'
import { getSession, signIn, signOut } from 'next-auth/react'

import { CONSTANTS } from '@/utils'
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

    await signIn('credentials', {
      redirect: false,
      email,
      password,
      redirectTo: '/',
    })

    const session = await getSession()

    if (session?.error) {
      setAuthStatus('unauthenticated')
      toast.error(session.error)
      signOut({ redirect: false })

      return
    }

    setAuthStatus('authenticated')
    if (session?.user.role === CONSTANTS.roleName.admin)
      redirect(`/${session?.user.role}`)
    else redirect('/student/menu')
  }

  useEffect(() => {
    if (auth?.role)
      if (auth.role === CONSTANTS.roleName.admin) redirect(`/${auth.role}`)
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
          labelText="Email"
          labelClassName="text-sm"
          placeholder="user@campus.unimib.it"
          onChange={({ value }) => setEmail(value)}
        />
        <Input
          isRequired
          id="password"
          type="password"
          value={password}
          labelText="Password"
          placeholder="✳✳✳✳✳✳✳✳✳✳"
          labelClassName="text-sm"
          onChange={({ value }) => setPassword(value)}
        />
        <Link
          href="/reset-password"
          className="ml-auto w-max cursor-pointer text-sm text-neutral-500"
        >
          Forgot Password?
        </Link>
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
