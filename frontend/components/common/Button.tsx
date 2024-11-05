import { MouseEvent, ReactNode } from 'react'

import { classnames } from '@/utils'

interface ButtonProps {
  className?: string
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, className = '', onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classnames(
        'rounded-3xl bg-primary px-4 py-2 text-white',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
