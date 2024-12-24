'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { useStore } from '@/store/provider'
import { classnames, CONSTANTS } from '@/utils'
import Button from '@/components/common/Button'
import VscGear from '@/components/icons/VscGear'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import BsCreditCard from '@/components/icons/BsCreditCard'
import AiOutlineBell from '@/components/icons/AiOutlineBell'
import LanguageSelector from '@/components/common/LanguageSelector'
import { adminMenuOptions, studentMenuOptions } from '@/sections/Header'

const PanelHeader = () => {
  const { auth, logout } = useStore((state) => state)

  const [expended, setExpended] = useState(false)

  return (
    <div className="z-0 h-min w-full items-center gap-2 px-6 py-4 md:p-8">
      <div className="flex flex-1 items-center justify-end gap-4">
        {auth.role === CONSTANTS.roleName.admin ? (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl text-blue-500">
              <AiOutlineBell />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-2xl text-red-500">
              <VscGear />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 rounded-3xl border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 md:px-4 md:py-2 md:text-base">
              <BsCreditCard /> <span>€{auth.credit}</span>
            </div>
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
          </>
        )}

        <span className="h-10 w-px bg-neutral-300" />

        <div
          aria-hidden
          className="relative flex cursor-pointer items-center gap-3"
          onClick={() => setExpended(!expended)}
        >
          <div className="hidden md:block">
            <p>{auth?.name}</p>
            <p className="text-sm uppercase text-neutral-400">{auth?.role}</p>
          </div>
          <Image
            width={40}
            height={40}
            alt="Agent"
            className="h-10 w-10 rounded-full border border-primary bg-primary"
            src={
              auth.image
                ? `${assetsBaseUrl}${auth.image}`
                : '/images/students/s-1.png'
            }
          />

          <div
            className={classnames(
              'absolute right-0 top-14 z-50 min-w-36 overflow-hidden rounded-lg bg-white px-3 shadow duration-300 md:top-16',
              expended ? 'max-h-48 py-3' : 'max-h-0 py-0'
            )}
          >
            <div className="grid gap-1 text-right text-sm md:text-left">
              {auth.role === CONSTANTS.roleName.admin
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
              <Button onPress={logout} className="w-full min-w-max rounded-lg">
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelHeader
