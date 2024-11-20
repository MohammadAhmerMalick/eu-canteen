'use client'

import { useEffect, useState } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useStore } from '@/store/provider'

const C = () => {
  const { data: session, status } = useSession()
  const { setAuth, setAuthStatus } = useStore((state) => state)
  useEffect(() => {
    console.log({ status })
    setAuthStatus(status)
    if (status === 'authenticated') setAuth(session?.user)
  }, [session?.user, status, setAuth, setAuthStatus])
  return <span className="absolute -z-50 hidden opacity-0">Poolaster</span>
}

export default function Template({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <C />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
