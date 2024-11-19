import { MouseEvent, ReactNode } from 'react'

import { classnames } from '@/utils'

interface ButtonProps {
  disabled?: boolean
  className?: string
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  children,
  disabled,
  className = '',
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        'rounded-3xl px-4 py-2 text-white',
        disabled ? 'bg-neutral-400' : 'bg-primary',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
