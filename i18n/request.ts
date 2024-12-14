import { getRequestConfig } from 'next-intl/server'

import { getLocale } from '@/actions/locale'

export default getRequestConfig(async () => {
  const locale: string = await getLocale()

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
