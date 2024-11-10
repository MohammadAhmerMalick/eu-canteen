'use client'

import { useRef } from 'react'

import { allowOnlyNumber, classnames } from '@/utils'

interface TextareaProps {
  id: string
  value: string
  labelText?: string
  readOnly?: boolean
  placeholder: string
  onlyNumber?: boolean
  isRequired?: boolean
  labelClassName?: string
  textareaClassName?: string
  onChange: (currentTarget: EventTarget & HTMLTextAreaElement) => void
}

const Textarea = ({
  id,
  value,
  readOnly,
  labelText,
  isRequired,
  onlyNumber,
  placeholder,
  textareaClassName,
  labelClassName,
  onChange,
}: TextareaProps) => {
  const INPUT = useRef<HTMLTextAreaElement>(null)

  return (
    <label htmlFor={id} className={classnames('block', labelClassName)}>
      {labelText}
      <textarea
        id={id}
        readOnly={readOnly}
        ref={INPUT}
        value={value}
        onInput={(e) => (onlyNumber ? allowOnlyNumber(e) : e)}
        required={isRequired}
        placeholder={placeholder}
        className={classnames(
          labelText && 'mt-2',
          'block w-full rounded-md border border-neutral-300 p-2 text-neutral-900 focus:border-primary focus:ring-1 focus:ring-orange-300 focus-visible:outline-0',
          textareaClassName
        )}
        onChange={({ currentTarget }) => onChange(currentTarget)}
      />
    </label>
  )
}

export default Textarea
