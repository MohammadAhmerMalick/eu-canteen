'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import VscGear from '@/components/icons/VscGear'
import FiSearch from '@/components/icons/FiSearch'
import AiOutlineBell from '@/components/icons/AiOutlineBell'
import { adminMenuOptions, studentMenuOptions } from '@/sections/Header'

const PanelHeader = () => {
  const { auth, logout } = useStore((state) => state)

  const [expended, setExpended] = useState(false)
  const [globalSarch, setGlobalSarch] = useState('')

  return (
    <div className="z-0 grid h-min w-full grid-cols-[auto_300px] items-center gap-2 p-8">
      <div className="relative">
        <Input
          value={globalSarch}
          id="globalSarch"
          placeholder="Search here"
          inputClassName="text-sm h-full px-3"
          onChange={({ value }) => setGlobalSarch(value)}
        />

        <span className="absolute bottom-0 right-3 top-0 my-auto h-min text-lg text-neutral-400">
          <FiSearch />
        </span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl text-blue-500">
          <AiOutlineBell />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-2xl text-red-500">
          <VscGear />
        </div>

        <span className="h-10 w-px bg-neutral-300" />

        <div
          aria-hidden
          className="relative flex cursor-pointer items-center gap-3"
          onClick={() => setExpended(!expended)}
        >
          <div>
            <p className="">{auth?.name}</p>
            <p className="text-sm text-neutral-400">
              {auth?.role.toUpperCase()}
            </p>
          </div>
          <Image
            width={40}
            height={40}
            alt="Agent"
            src="/images/agents/agent-1.png"
            className="h-10 w-10 rounded-full border border-primary bg-primary"
          />

          <div
            className={classnames(
              'absolute right-0 top-14 z-50 overflow-hidden rounded-3xl bg-white px-4 shadow duration-300 md:left-0',
              expended ? 'max-h-48 py-3' : 'max-h-0 py-0'
            )}
          >
            <div className="grid gap-1 text-right text-sm md:text-left">
              {auth.role === 'admin'
                ? adminMenuOptions.map(({ link, name }) => (
                    <Link key={name} href={link}>
                      {name}
                    </Link>
                  ))
                : studentMenuOptions.map(({ link, name }) => (
                    <Link key={name} href={link}>
                      {name}
                    </Link>
                  ))}
              <Button onPress={logout} className="w-full min-w-max">
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
