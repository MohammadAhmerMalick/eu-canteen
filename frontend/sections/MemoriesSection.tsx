import Image from 'next/image'
import { useTranslations } from 'next-intl'

import SectionHeading from '@/components/SectionHeading'

const MemoriesSection = () => {
  const t = useTranslations('MemoriesSection')

  return (
    <section className="my-10 grid justify-center gap-8 text-center md:my-20">
      <Image
        width={179}
        height={64}
        className="mx-auto"
        alt={t('description')}
        src="/images/extras/h1-icon-img.png"
      />
      <SectionHeading className="max-w-xl">{t('title')}</SectionHeading>
      <h3 className="mrs-saint-delafield-regular text-5xl text-orange-700/50">
        {t('description')}
      </h3>
    </section>
  )
}

export default MemoriesSection
