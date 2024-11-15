'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { classnames } from '@/utils'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useStore } from '@/store/provider'
import VscGear from '@/components/icons/VscGear'
import FiSearch from '@/components/icons/FiSearch'
import AiOutlineBell from '@/components/icons/AiOutlineBell'

const PanelHeader = () => {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn } = useStore((state) => state)

  const [expended, setExpended] = useState(false)
  const [globalSarch, setGlobalSarch] = useState('')

  const logout = () => {
    setIsLoggedIn(false)
  }

  useEffect(() => {
    if (!isLoggedIn) router.push('/')
  }, [isLoggedIn, router])

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
            <p className="">Asad Khan</p>
            <p className="text-sm text-neutral-400">Admin</p>
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
              <Link href="/">Home</Link>
              <Link href="/admin/students">Dashboard</Link>
              <p className="text-neutral-400">Settings</p>
              <p className="text-neutral-400">Orders</p>
              <p className="text-neutral-400">Profile</p>
              <Button onClick={() => logout()} className="w-full min-w-max">
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
