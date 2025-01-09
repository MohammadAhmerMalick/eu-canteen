import { FormEvent } from 'react'

import { storeFileLocally, uploadToCloudinay } from '@/libs/assetsManagement'

export const classnames = (...args: unknown[]) => {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
}

export const allowOnlyNumber = (
  event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const target = event?.currentTarget
  const value = target?.value

  target.value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
}

export const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts?.pop()?.split(';').shift() || ''
  return ''
}

/**
 * store file locally
 * @param file
 * @param folder should end with /
 * @returns
 */
export const uploadFile = async (file: File, folder?: string) => {
  const { name, imagePath } = await storeFileLocally(file)
  return uploadToCloudinay({ name, imagePath, folder })
}

export const randomFromArray = (array: { [any: string]: any }) =>
  array[Math.floor(Math.random() * array.length)]

export const getRandomDate = (from: Date, to: Date) => {
  const fromTime = from.getTime()
  const toTime = to.getTime()
  return new Date(fromTime + Math.random() * (toTime - fromTime))
}

export const CONSTANTS = {
  PRIMARY: '#FF7800',
  PRIMARY_LIGHT: '#FEE9DE',

  imagePlaceholders: {
    product: '/images/products/p-1.png',
  },

  roleName: {
    admin: 'admin',
    player: 'player',
    student: 'student',
  },

  otpType: {
    resetPassword: 'resetPassword',
  },
}
