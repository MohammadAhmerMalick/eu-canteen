'use client'

import Link from 'next/link'

import AuthLayoutSection from '@/sections/AuthLayoutSection'

const SignupPage = () => {
  return (
    <AuthLayoutSection title="Register with Poolaster" textCenter lg>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/register-student"
          className="space-y-2 rounded-3xl border border-neutral-100 bg-neutral-50 p-6 duration-150 hover:border-primary hover:bg-primary-light"
        >
          <h2 className="font-lg font-semibold">Student Registration</h2>
          <p className="text-sm font-normal">
            Please select this option, If you have Bicocca University Student
            Meal Card and University Email.
          </p>
        </Link>
        <Link
          href="/register-player"
          className="space-y-2 rounded-3xl border border-neutral-100 bg-neutral-50 p-6 duration-150 hover:border-primary hover:bg-primary-light"
        >
          <h2 className="font-lg font-semibold">Sport Player Registration</h2>
          <p className="text-sm font-normal">
            Please select this option, If you are any Sport Player and you do
            not have Bicocca University Student Card and University Email.
          </p>
        </Link>
      </div>

      <p className="mt-4 text-center text-sm font-normal text-neutral-500">
        Already have an account?{' '}
        <Link
          href="login"
          className="font-semibold text-black duration-150 hover:text-primary"
        >
          Login
        </Link>
      </p>
    </AuthLayoutSection>
  )
}

export default SignupPage
