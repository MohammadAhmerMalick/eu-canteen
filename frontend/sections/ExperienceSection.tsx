import Image from 'next/image'
import { useTranslations } from 'next-intl'

import SectionHeading from '@/components/SectionHeading'

const ExperienceSection = () => {
  const t = useTranslations('ExperienceSection')

  return (
    <section className="my-10 grid justify-between gap-10 text-center md:my-20 md:grid-cols-2 md:text-left">
      <div>
        <SectionHeading>{t('title')}</SectionHeading>
        <p className="mt-4 font-normal">{t('description')}</p>
      </div>
      <Image
        width={320}
        height={325}
        alt={t('title')}
        src="/images/banners/service-banner.png"
        className="mx-auto hidden w-full max-w-80 md:block"
      />
    </section>
  )
}

export default ExperienceSection
