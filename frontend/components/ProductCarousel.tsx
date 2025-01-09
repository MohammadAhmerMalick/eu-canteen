'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Carousel, { type ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive: ResponsiveType = {
  superLargeDesktop: { items: 6, breakpoint: { max: 4000, min: 3000 } },
  desktop: { items: 6, breakpoint: { max: 3000, min: 1024 } },
  tablet: { items: 6, breakpoint: { max: 1024, min: 464 } },
  mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
}

const ProductCarousel = () => {
  const t = useTranslations('HeroSection')

  const products = [
    {
      id: 1,
      image: '/images/products/p-5.png',
      title: t('slider.1.title'),
      details: t('slider.1.description'),
    },
    {
      id: 2,
      image: '/images/products/p-4.png',
      title: t('slider.2.title'),
      details: t('slider.2.description'),
    },
    {
      id: 3,
      image: '/images/products/p-6.png',
      title: t('slider.3.title'),
      details: t('slider.3.description'),
    },
    {
      id: 4,
      image: '/images/products/p-7.png',
      title: t('slider.4.title'),
      details: t('slider.4.description'),
    },
    {
      id: 5,
      image: '/images/products/p-4.png',
      title: t('slider.1.title'),
      details: t('slider.1.description'),
    },
    {
      id: 6,
      image: '/images/products/p-5.png',
      title: t('slider.2.title'),
      details: t('slider.2.description'),
    },
    {
      id: 7,
      image: '/images/products/p-6.png',
      title: t('slider.3.title'),
      details: t('slider.3.description'),
    },
    {
      id: 8,
      image: '/images/products/p-7.png',
      title: t('slider.4.title'),
      details: t('slider.4.description'),
    },
  ]

  return (
    <Carousel
      ssr
      infinite
      autoPlay
      arrows={false}
      autoPlaySpeed={3000}
      responsive={responsive}
      className="grid"
    >
      {products.map(({ id, image, title, details }) => (
        <div
          key={id}
          className="relative mx-3 mb-6 mt-28 rounded-3xl bg-white p-6 pt-32 text-center shadow-lg md:min-w-72"
        >
          <Image
            alt={title}
            src={image}
            width={230}
            height={230}
            className="absolute -top-28 left-0 right-0 mx-auto w-56 drop-shadow-xl"
          />
          <h2 className="mb-2 text-lg font-semibold">{title}</h2>
          <p className="min-h-12 text-neutral-700">{details}</p>
        </div>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
