import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Poolaster',
  description: 'Canteen',
  icons: [
    { rel: 'apple-touch-icon', url: './images/logo.svg' },
    { rel: 'icon', url: './images/logo.svg' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  )
}
