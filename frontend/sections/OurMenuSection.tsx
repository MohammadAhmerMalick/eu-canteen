import Image from 'next/image'
import { useTranslations } from 'next-intl'

import LinkButton from '@/components/common/LinkButton'
import SectionHeading from '@/components/SectionHeading'

const OurMenuSection = () => {
  const t = useTranslations('OurMenuSection')

  const menuItems = [
    {
      type: t('menuItems.1.type'),
      price: t('menuItems.1.price'),
      details: t('menuItems.1.details'),
    },
    {
      type: t('menuItems.2.type'),
      price: t('menuItems.2.price'),
      details: t('menuItems.2.details'),
    },
    {
      type: t('menuItems.3.type'),
      price: t('menuItems.3.price'),
      details: t('menuItems.3.details'),
    },
    {
      type: t('menuItems.4.type'),
      price: t('menuItems.4.price'),
      details: t('menuItems.4.details'),
    },
  ]

  const specialItems = [
    {
      title: t('specialItems.1.title'),
      image: '/images/products/p-2.png',
      action: t('specialItems.1.action'),
      amount: t('specialItems.1.amount'),
      description: t('specialItems.1.description'),
    },
    {
      title: t('specialItems.2.title'),
      image: '/images/products/p-8.png',
      action: t('specialItems.2.action'),
      amount: t('specialItems.2.amount'),
      description: t('specialItems.2.description'),
    },
    {
      title: t('specialItems.3.title'),
      image: '/images/products/p-9.png',
      action: t('specialItems.3.action'),
      amount: t('specialItems.3.amount'),
      description: t('specialItems.3.description'),
    },
  ]

  return (
    <section className="my-10 grid justify-center gap-10 text-center md:my-20">
      <SectionHeading className="mx-auto">{t('title')}</SectionHeading>
      <div className="grid gap-1">
        {menuItems.map(({ type, details, price }) => (
          <p key={type}>
            {details} ={' '}
            <span className="rounded-md bg-primary px-2 text-white">
              {price}
            </span>
          </p>
        ))}
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {specialItems.map(({ description, title, amount, image, action }) => (
          <div
            key={title}
            className="mx-auto grid w-full max-w-72 gap-5 rounded-3xl bg-white p-2 shadow-lg"
          >
            <Image
              width={288}
              alt={title}
              src={image}
              height={208}
              className="h-52 w-72 rounded-3xl bg-primary-light object-contain shadow"
            />
            <p className="text-2xl">
              {title}{' '}
              <span className="rounded-full bg-primary px-3 font-normal text-white">
                {amount}
              </span>
            </p>
            <div className="grid gap-3 px-6 text-neutral-700">
              <p className="text-sm">{description}</p>
            </div>
            <LinkButton
              href="/products"
              className="mx-2 mb-2 rounded-b-3xl rounded-t-md"
            >
              {action}
            </LinkButton>
          </div>
        ))}
      </div>
      <div className="relative flex justify-center">
        <LinkButton className="relative z-10" href="/products">
          {t('exploreMore')}
        </LinkButton>
        <div className="absolute bottom-0 top-0 my-auto h-px w-full bg-gradient-to-r from-transparent via-orange-700 to-transparent" />
      </div>
    </section>
  )
}

export default OurMenuSection
