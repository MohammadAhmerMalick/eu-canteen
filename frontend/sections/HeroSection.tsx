import { useTranslations } from 'next-intl'

import LinkButton from '@/components/common/LinkButton'
import ProductCarousel from '@/components/ProductCarousel'

const HeroSection = () => {
  const t = useTranslations('HeroSection')

  return (
    <section className="my-10 grid grid-cols-1 gap-4 gap-y-12 md:mt-20 md:grid-cols-[500px_2000px]">
      <div className="text-center md:text-start">
        <h1 className="bellota-regular bellota-light text-5xl uppercase md:text-7xl">
          <span className="font-semibold">{t('heading')}</span>
          <span className="mx-auto -mt-4 mb-2 block h-2 w-[286px] bg-primary md:mx-0 md:-mt-5 md:h-3 md:w-[430px]" />
          <span className="text-4xl md:text-6xl">{t('subHeading')}</span>
        </h1>

        <div className="mt-4 md:text-lg">
          <p>{t('paragraph.1')}</p>
          <p>{t('paragraph.2')}</p>
        </div>

        <LinkButton className="mt-6 md:text-lg" href="/products">
          {t('buttonText')}
        </LinkButton>
      </div>
      <ProductCarousel />
    </section>
  )
}

export default HeroSection
