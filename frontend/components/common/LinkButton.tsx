import Link from 'next/link'
import { type ReactNode } from 'react'
import { type Url } from 'next/dist/shared/lib/router/router'

import { classnames } from '@/utils'

interface LinkButtonProps {
  href: Url
  children: ReactNode
  className?: string
}
const LinkButton = ({ href, children, className = '' }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={classnames(
        'inline-block rounded-3xl bg-primary px-4 py-2 text-white',
        className
      )}
    >
      {children}
    </Link>
  )
}

export default LinkButton
