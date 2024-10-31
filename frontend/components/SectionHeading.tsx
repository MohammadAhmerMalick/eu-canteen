import { ReactNode } from 'react'

import { classnames } from '@/utils'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  return (
    <h2
      className={classnames(
        'bellota-light max-w-lg text-3xl uppercase text-orange-900',
        className
      )}
    >
      {children}
    </h2>
  )
}

export default SectionHeading
