'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import BsCreditCard from '@/components/icons/BsCreditCard'
import LanguageSelector from '@/components/common/LanguageSelector'

export const adminMenuOptions = [
  { link: '/admin', name: 'Dashboard' },
  { link: '/admin/orders', name: 'Orders' },
]

export const studentMenuOptions = [
  { link: '/student/menu', name: 'Menu' },
  { link: '/student/orders', name: 'Orders' },
]

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
          <div className="flex items-center gap-2 md:gap-6">
            <div className="flex items-center gap-2 rounded-3xl border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 md:px-4 md:py-2 md:text-base">
              <BsCreditCard /> <span>€{auth.credit}</span>
            </div>
            <LanguageSelector />
            <div className="relative">
              <div
                aria-hidden
                onClick={() => setExpended(!expended)}
                className={classnames(
                  'flex h-12 cursor-pointer overflow-hidden rounded-3xl bg-white p-1 shadow duration-150 md:h-14 md:p-2',
                  expended && 'rounded-b-lg rounded-t-3xl'
                )}
              >
                <Image
                  width={40}
                  height={40}
                  alt={auth.name}
                  src={
                    auth.image
                      ? `${assetsBaseUrl}${auth.image}`
                      : '/images/students/s-1.png'
                  }
                  className="size-10nrounded-full object-contai border border-primary bg-primary"
                />
                <div className="max-w-0 overflow-hidden text-sm duration-300 md:max-w-40 md:px-2 md:pr-3">
                  <p>{auth.name}</p>
                  <p className="uppercase text-neutral-500">{auth.role}</p>
                </div>
              </div>
              <div
                className={classnames(
                  'absolute right-0 top-14 z-50 overflow-hidden rounded-lg bg-white px-3 shadow duration-300 md:left-0 md:top-16',
                  expended ? 'max-h-48 py-3' : 'max-h-0 py-0'
                )}
              >
                <div className="grid gap-1 text-right text-sm md:text-left">
                  {auth.role === 'admin'
                    ? adminMenuOptions.map(({ link, name }) => (
                        <Link
                          key={name}
                          href={link}
                          className="rounded-lg px-2 py-1 hover:bg-primary-light"
                        >
                          {name}
                        </Link>
                      ))
                    : studentMenuOptions.map(({ link, name }) => (
                        <Link
                          key={name}
                          href={link}
                          className="rounded-lg px-2 py-1 hover:bg-primary-light"
                        >
                          {name}
                        </Link>
                      ))}
                  <Button
                    onPress={logout}
                    className="w-full min-w-max rounded-lg"
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-6">
            <LanguageSelector />
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
