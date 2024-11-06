import { FormEvent } from 'react'

export const classnames = (...args: unknown[]) => {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
}

export const allowOnlyNumber = (event: FormEvent<HTMLInputElement>) => {
  const target = event?.currentTarget
  const value = target?.value

  target.value = value.replace(/\D/g, '')
}
