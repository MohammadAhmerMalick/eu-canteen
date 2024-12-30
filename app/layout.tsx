import type { Metadata } from 'next'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import Toast from '@/components/Toast'
import { AppStoreProvider } from '@/store/provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Poolaster',
  description: 'Canteen',
  icons: [
    { rel: 'apple-touch-icon', url: '/images/logo.svg' },
    { rel: 'icon', url: '/images/logo.svg' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="antialiased">
        <AppStoreProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AppStoreProvider>
        <Toast />
      </body>
    </html>
  )
}
