'use client'

import { type RefAttributes } from 'react'
import { Button as AriaButton, type ButtonProps } from 'react-aria-components'

import { classnames } from '@/utils'

const Button = ({
  children,
  className,
  type = 'submit',
  ...props
}: ButtonProps & RefAttributes<HTMLButtonElement>) => {
  return (
    <AriaButton
      {...props}
      type={type}
      className={({ isDisabled }) =>
        classnames(
          'rounded-3xl px-4 py-2 text-white',
          isDisabled ? 'bg-neutral-400' : 'bg-primary',
          className
        )
      }
    >
      {children}
    </AriaButton>
  )
}

export default Button
