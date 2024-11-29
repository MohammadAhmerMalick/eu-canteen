'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'

const Header = () => {
  const { auth, authStatus, logout } = useStore((state) => state)
  const [expended, setExpended] = useState(false)
  const isLoggedIn = authStatus === 'authenticated' && !!auth

  return (
    <header className="relative z-50 bg-primary-light">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/">
          <Image
            height={100}
            width={80}
            alt="Poolaster"
            src="/images/logo.svg"
            className={classnames(
              'h-auto duration-300 md:w-20',
              isLoggedIn ? 'w-10' : 'w-14'
            )}
          />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <p className="rounded-3xl bg-white px-4 py-2 text-sm shadow-lg">
              €{auth.credit}
            </p>
            <div className="relative">
              <div
                aria-hidden
                onClick={() => setExpended(!expended)}
                className="flex h-12 cursor-pointer overflow-hidden rounded-full bg-white p-1 shadow md:h-14 md:p-2"
              >
                <Image
                  width={40}
                  height={40}
                  alt="Agent"
                  src="/images/students/s-1.png"
                  className="h-10 w-10 rounded-full border border-primary bg-primary"
                />
                <div className="max-w-0 overflow-hidden text-sm duration-300 md:max-w-40 md:px-2 md:pr-3">
                  <p>{auth.name}</p>
                  <p className="text-neutral-500">#EP-1749051</p>
                </div>
              </div>
              <div
                className={classnames(
                  'absolute right-0 top-14 z-50 overflow-hidden rounded-3xl bg-white px-4 shadow duration-300 md:left-0 md:top-16',
                  expended ? 'max-h-48 py-3' : 'max-h-0 py-0'
                )}
              >
                <div className="grid gap-1 text-right text-sm md:text-left">
                  <Link href="/">Home</Link>
                  <Link href={`/${auth.role}`}>Dashboard</Link>
                  <p className="text-neutral-400">Settings</p>
                  <p className="text-neutral-400">Orders</p>
                  <p className="text-neutral-400">Profile</p>
                  <Button onPress={logout} className="w-full min-w-max">
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="rounded-3xl bg-white px-4 py-2 text-sm shadow-lg">
              ENG
            </p>
            <div className="flex items-center gap-1 rounded-full bg-black p-1 text-sm md:text-base">
              <Link href="/register" className="db pr-2 ps-3 text-white">
                Register Here
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-primary px-3 py-1 text-white"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
