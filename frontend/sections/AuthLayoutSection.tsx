import Link from 'next/link'
import Image from 'next/image'
import { type ReactNode } from 'react'

interface AuthLayoutSectionProps {
  title: string
  children: ReactNode
}

const AuthLayoutSection = ({ children, title }: AuthLayoutSectionProps) => {
  return (
    <main className="relative flex min-h-dscreen items-center justify-center bg-[url('/images/backgrounds/auth-bg.jpg')] p-4 pb-20">
      <div className="grid w-full max-w-md gap-3 rounded-3xl border border-primary-light bg-white p-6 shadow-lg md:p-10 md:pb-6">
        <Link href="/">
          <Image
            height={90}
            width={90}
            src="/images/logo.svg"
            alt="Poolaster"
            className="mx-auto w-20"
          />
        </Link>
        <h1 className="my-4 text-xl font-semibold">{title}</h1>
        {children}
      </div>

      <div className="absolute bottom-0 mt-auto w-full p-2 text-center text-sm text-white drop-shadow md:text-right">
        <p>Made with 💝 | A Product of Asmeron (Pvt.) Ltd & OS Tech Hub LLC</p>
        <p>© 2024 Poolaster, ALL RIGHTS RESERVED</p>
      </div>
    </main>
  )
}

export default AuthLayoutSection
