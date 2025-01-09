'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import AuthLayoutSection from '@/sections/AuthLayoutSection'
import resetPasswordByOtp from '@/actions/otp/resetPasswordByOtp'
import insertPasswordResetOtp from '@/actions/otp/insertPasswordResetOtp'

const ResetPasswordPage = () => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpSend, setOtpSend] = useState(false)

  const otpRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { message, success } = await insertPasswordResetOtp(email)

    if (success) {
      toast.success(message)
      setOtpSend(true)
    } else {
      toast.error(message)
    }
  }

  const { mutate: mutateOtpRequest, isPending: otpSending } = useMutation({
    mutationFn: otpRequest,
  })

  const resetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    const { message, success } = await resetPasswordByOtp({
      otp,
      email,
      password,
    })

    if (success) {
      toast.success(message)
      setOtpSend(true)
    } else {
      toast.error(message)
    }
  }

  const { mutate: mutateResetPassword, isPending: resetingPassword } =
    useMutation({
      mutationFn: resetPassword,
    })

  return (
    <AuthLayoutSection title="Reset Password">
      {otpSend ? (
        <form onSubmit={mutateResetPassword} className="grid gap-3">
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
          <Input
            isRequired
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            labelText="Confirm Password"
            placeholder="✳✳✳✳✳✳✳✳✳✳"
            labelClassName="text-sm"
            onChange={({ value }) => setConfirmPassword(value)}
          />
          <Input
            isRequired
            onlyNumber
            id="otp"
            value={otp}
            labelText="OTP"
            placeholder="123456"
            labelClassName="text-sm"
            onChange={({ value }) => setOtp(value)}
          />
          <Button className="mt-4" isDisabled={resetingPassword}>
            Update Password
          </Button>

          <p className="mt-4 text-center text-sm font-normal text-neutral-500">
            Back to{' '}
            <Link
              href="login"
              className="font-semibold text-black duration-150 hover:text-primary"
            >
              Login Page
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={mutateOtpRequest} className="grid gap-3">
          <Input
            isRequired
            id="email"
            type="email"
            value={email}
            labelText="Email"
            labelClassName="text-sm"
            placeholder="user@email.com"
            onChange={({ value }) => setEmail(value)}
          />
          <Button className="mt-4" isDisabled={otpSending}>
            Send Otp
          </Button>

          <p className="mt-4 text-center text-sm font-normal text-neutral-500">
            Back to{' '}
            <Link
              href="login"
              className="font-semibold text-black duration-150 hover:text-primary"
            >
              Login Page
            </Link>
          </p>
        </form>
      )}
    </AuthLayoutSection>
  )
}

export default ResetPasswordPage
