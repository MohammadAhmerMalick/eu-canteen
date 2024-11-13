'use client'

import { useEffect } from 'react'

import { getCookie } from '@/utils'
import { useStore } from '@/store/provider'

export default function Template({ children }: { children: React.ReactNode }) {
  const { setIsLoggedIn } = useStore((state) => state)

  useEffect(() => {
    const token = getCookie('token')
    setIsLoggedIn(!!token)
  }, [setIsLoggedIn])

  return <div>{children}</div>
}
