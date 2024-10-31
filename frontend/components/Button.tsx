import { ReactNode } from 'react'
import { classnames } from '@/utils'

interface ButtonProps {
  children: ReactNode
  className?: string
}

const Button = ({ children, className = '' }: ButtonProps) => {
  return (
    <button
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
