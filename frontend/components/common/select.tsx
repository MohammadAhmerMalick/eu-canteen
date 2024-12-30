'use client'

import { classnames } from '@/utils'

interface Select {
  id: string
  value: string
  labelText?: string
  isRequired?: boolean
  labelClassName?: string
  inputClassName?: string
  onChange: (currentTarget: EventTarget & HTMLSelectElement) => void
  options: { text: string; value: string; key: string }[]
}

const Select = ({
  id,
  value,
  options,
  labelText,
  isRequired,
  inputClassName,
  labelClassName,
  onChange,
}: Select) => {
  return (
    <label htmlFor={id} className={classnames('block', labelClassName)}>
      {labelText}
      <select
        id={id}
        value={value}
        required={isRequired}
        className={classnames(
          labelText && 'mt-2',
          'block w-full rounded-md border border-neutral-300 bg-white p-2 text-neutral-900 focus:border-primary focus:ring-1 focus:ring-orange-300 focus-visible:outline-0',
          inputClassName
        )}
        onChange={({ currentTarget }) => onChange(currentTarget)}
      >
        {options.map(({ key, text, value }) => (
          <option key={key} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
