'use server'

import { cookies } from 'next/headers'

import { defaultLocale, type Locale } from '@/i18n/config'

const COOKIE_NAME = 'NEXT_LOCALE'

export const setUserLocale = async (locale: Locale) => {
  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, locale)
}

export const getLocale = async () => {
  const cookieStore = await cookies()

  const lang = cookieStore.get(COOKIE_NAME)?.value || defaultLocale

  return lang
}
