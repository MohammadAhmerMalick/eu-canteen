import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import LinkButton from '@/components/common/LinkButton'

const QrBannerSection = () => {
  const t = useTranslations('QrBannerSection')

  return (
    <section className="philosopher-bold relative my-10 grid items-center gap-y-12 overflow-hidden rounded-3xl px-6 py-10 text-white md:my-20 md:grid-cols-3">
      <Image
        alt={t('offer')}
        width={1280}
        height={600}
        className="absolute h-full w-full object-cover"
        src="/images/banners/qr-banner.png"
      />

      <div className="relative z-10 space-y-4 text-center md:space-y-8">
        <p className="mx-auto w-max border-b-2 border-white text-3xl text-primary md:text-4xl">
          {t('name')}
        </p>
        <p className="px-8 text-2xl md:text-4xl">{t('offer')}</p>
        <p className="text-xl">{t('condition.1')}</p>
        <Link
          className="mx-auto block w-max rounded-xl border border-white px-3 py-1"
          href="/"
        >
          www.poolaster.com
        </Link>
      </div>
      <div className="relative z-10 text-center">
        <div className="relative mx-auto h-80 w-60 border-4 border-white" />
        <Image
          alt="Dish"
          width={288}
          height={288}
          className="absolute left-0 right-0 top-4 mx-auto w-72"
          src="/images/banners/banner-food-dish.png"
        />
        <p className="mt-4">{t('condition.2')}</p>
      </div>
      <div className="relative z-10 space-y-4 text-center">
        <p>{t('activate')}</p>
        <Image
          alt="/register-player"
          width={224}
          height={224}
          className="mx-auto w-56"
          src="/images/banners/player-login-qr-code.svg"
        />
        <p>{t('Or')}</p>
        <LinkButton href="/register-player" className="mt-4">
          {t('clickHere')}
        </LinkButton>
      </div>
    </section>
  )
}

export default QrBannerSection
