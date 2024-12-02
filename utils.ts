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

  target.value = value.replace(/\D/g, '')
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
