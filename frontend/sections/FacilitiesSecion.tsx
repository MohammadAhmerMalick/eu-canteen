'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Carousel, { type ResponsiveType } from 'react-multi-carousel'

const responsive: ResponsiveType = {
  superLargeDesktop: { items: 7, breakpoint: { max: 4000, min: 3000 } },
  desktop: { items: 7, breakpoint: { max: 3000, min: 1024 } },
  tablet: { items: 5, breakpoint: { max: 1024, min: 464 } },
  mobile: { items: 2, breakpoint: { max: 464, min: 0 } },
}

const FacilitiesSecion = () => {
  const t = useTranslations('FacilitiesSection')

  const blocks = [
    {
      image: '/images/extras/buffet-icon.svg',
      text: t('1'),
    },
    {
      image: '/images/extras/catering-icon.svg',
      text: t('2'),
    },
    {
      image: '/images/extras/air-conditioning-icon.svg',
      text: t('3'),
    },
    {
      image: '/images/extras/self-parking-icon.svg',
      text: t('4'),
    },
    {
      image: '/images/extras/private-events-icon.svg',
      text: t('5'),
    },
    {
      image: '/images/extras/smoking-area-icon.svg',
      text: t('6'),
    },
    {
      image: '/images/extras/pets-allowed-icon.svg',
      text: t('7'),
    },
  ]

  return (
    <section className="my-10 md:my-20">
      <Image
        alt="banner"
        width={1280}
        height={600}
        className="mx-auto"
        src="/images/banners/banner-1.png"
      />

      <div className="relative z-10 mx-auto mt-4 max-w-5xl rounded-3xl bg-white p-4 text-center md:-mt-12">
        <Carousel
          ssr
          infinite
          autoPlay
          arrows={false}
          autoPlaySpeed={3000}
          responsive={responsive}
          className="grid"
        >
          {blocks.map(({ image, text }) => (
            <div key={text} className="texe-sm font-normal">
              <Image
                width={50}
                height={48}
                alt={`${text} Facility Available`}
                src={image}
                className="mx-auto h-8 drop-shadow md:h-14"
              />
              <p className="mt-2 text-sm">{text}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default FacilitiesSecion
