'use client'

import {
  //  useEffect,
  useState,
} from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { getCookie } from '@/utils'
// import { useStore } from '@/store/provider'

export default function Template({ children }: { children: React.ReactNode }) {
  // const { setAuth } = useStore((state) => state)

  const [queryClient] = useState(() => new QueryClient())

  // useEffect(() => {
  //   const token = getCookie('token')
  //   // setAuthn(!!token)
  // }, [setAuth])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
