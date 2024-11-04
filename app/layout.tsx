import type { Metadata } from 'next'

import { AuthStoreProvider } from '@/store/provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Canteen',
  description: 'Canteen',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <AuthStoreProvider>{children}</AuthStoreProvider>
      </body>
    </html>
  )
}
