'use client'

import { useRef } from 'react'

import { allowOnlyNumber, classnames } from '@/utils'

interface Input {
  id: string
  value: string
  labelText?: string
  readOnly?: boolean
  placeholder: string
  onlyNumber?: boolean
  isRequired?: boolean
  labelClassName?: string
  inputClassName?: string
  type?: 'text' | 'password' | 'email'
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const Input = ({
  id,
  value,
  readOnly,
  labelText,
  isRequired,
  onlyNumber,
  placeholder,
  inputClassName,
  type = 'text',
  labelClassName,
  onChange,
}: Input) => {
  const INPUT = useRef<HTMLInputElement>(null)

  return (
    <label htmlFor={id} className={classnames('block', labelClassName)}>
      {labelText}
      <input
        id={id}
        readOnly={readOnly}
        type={type}
        ref={INPUT}
        value={value}
        onInput={(e) => (onlyNumber ? allowOnlyNumber(e) : e)}
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
