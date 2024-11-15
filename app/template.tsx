'use client'

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { getCookie } from '@/utils'
import { useStore } from '@/store/provider'

export default function Template({ children }: { children: React.ReactNode }) {
  const { setIsLoggedIn } = useStore((state) => state)

  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    const token = getCookie('token')
    setIsLoggedIn(!!token)
  }, [setIsLoggedIn])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
