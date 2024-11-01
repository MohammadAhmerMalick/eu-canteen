'use client'

import { classnames } from '@/utils'

interface Input {
  id: string
  value: string
  labelText?: string
  placeholder: string
  isRequired?: boolean
  labelClassName?: string
  inputClassName?: string
  type?: 'text' | 'password' | 'email'
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const Input = ({
  id,
  value,
  labelText,
  isRequired,
  placeholder,
  inputClassName,
  type = 'text',
  labelClassName,
  onChange,
}: Input) => {
  return (
    <label htmlFor={id} className={classnames('block', labelClassName)}>
      {labelText}
      <input
        id={id}
        type={type}
        value={value}
        required={isRequired}
        placeholder={placeholder}
        className={classnames(
          labelText && 'mt-2',
          'block w-full rounded-md border border-neutral-300 p-2 text-neutral-900 focus:border-primary focus:ring-1 focus:ring-orange-300 focus-visible:outline-0',
          inputClassName
        )}
        onChange={({ currentTarget }) => onChange(currentTarget)}
      />
    </label>
  )
}

export default Input
