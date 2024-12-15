import Image from 'next/image'
import { useTranslations } from 'next-intl'

import SectionHeading from '@/components/SectionHeading'

const GreatServiceSection = () => {
  const t = useTranslations('GreatServiceSection')

  return (
    <section className="my-10 grid justify-center gap-8 text-center md:my-20">
      <Image
        width={178}
        height={63}
        className="mx-auto"
        alt={t('title')}
        src="/images/extras/h1-icon-img.png"
      />
      <SectionHeading>{t('title')}</SectionHeading>
    </section>
  )
}

export default GreatServiceSection
