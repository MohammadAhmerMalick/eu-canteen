'use client'

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'

import { useStore } from '@/store/provider'
import getMyProfileAction from '@/actions/user/getMyProfileActon'

const C = () => {
  const { data: session, status } = useSession()
  const { setAuth, setAuthStatus } = useStore((state) => state)

  useQuery({
    queryKey: ['getMyProfile'],
    queryFn: async () => {
      setAuthStatus(status)
      if (status === 'authenticated') setAuth(session?.user)

      const { data, success } = await getMyProfileAction()
      if (success) setAuth(data)
      return data
    },
  })

  useEffect(() => {
    setAuthStatus(status)
  }, [setAuthStatus, status])
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
