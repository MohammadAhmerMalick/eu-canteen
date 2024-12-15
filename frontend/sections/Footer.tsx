import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 text-center text-neutral-300">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="mx-auto max-w-72 border-b border-primary pb-3 md:mx-0 md:max-w-full md:border-b-0 md:border-r">
            <p className="mb-2 font-semibold uppercase">{t('contact.title')}</p>
            <a
              href={`tel:${t('contact.phone').replaceAll(' ', '')}`}
              className="block font-light"
            >
              {t('contact.phone')}
            </a>
            <a href={`mailto:${t('contact.email')}`} className="font-light">
              {t('contact.email')}
            </a>
          </div>
          <div className="mx-auto max-w-72 border-b border-primary pb-3 md:mx-0 md:max-w-full md:border-b-0 md:border-r">
            <p className="mb-2 font-semibold uppercase">{t('address.title')}</p>
            <p className="mx-auto max-w-40 font-light">
              {t('address.address')}
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase">
              {t('operations.title')}
            </p>
            <p className="mx-auto max-w-[343px] font-light">
              Monday-Friday: {t('operations.weekdays')} <br />
              Kitchen Closesat: {t('operations.kitchen')} <br />
              Saturday: {t('operations.saturday')} <br />
              Sunday: {t('operations.sunday')}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-black bg-white">
            <Link href="/">
              <Image
                width={80}
                height={120}
                alt="Poolaster"
                className="w-16"
                src="/images/logo.svg"
              />
            </Link>
          </div>
          <div className="absolute bottom-0 top-0 my-auto h-px w-full bg-gradient-to-r from-orange-950 via-primary to-orange-950" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-sm md:-mt-12 md:justify-between">
          <div>
            <p className="flex gap-3">
              <a
                href="https://www.facebook.com/poolasterbar"
                className="uppercase"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <span className="w-px bg-primary" />
              <a
                href="https://www.instagram.com/poolasterpubosteria/"
                className="uppercase"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <span className="w-px bg-primary" />
              <a
                href="/"
                className="uppercase"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest
              </a>
            </p>
            <Image
              height={40}
              width={288}
              alt="Poolaster"
              className="w-72"
              src="/images/extras/payments-methods.png"
            />
          </div>
          <div className="md:text-right">
            <p>{t('ribbon.designedBy')}</p>
            <p>{t('ribbon.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
