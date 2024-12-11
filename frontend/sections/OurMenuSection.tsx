import Image from 'next/image'

import LinkButton from '@/components/common/LinkButton'
import SectionHeading from '@/components/SectionHeading'

const menu = [
  {
    id: 1,
    amount: 5,
    title: 'PRIMI',
    description:
      'Discover our Primi menu. Fresh & delicious Italian dishes. To delight your taste buds',
    info: 'Mezze manic he al ragu Pasta al ragu',
  },
  {
    id: 2,
    amount: 7,
    title: 'SECONDI',
    description:
      'Discover our Primi menu. Fresh & delicious Italian dishes. To delight your taste buds.',
    info: 'Mezze manic he al ragu Pasta al ragu',
  },
  {
    id: 3,
    amount: 3,
    title: 'CONTORNI',
    description:
      'Discover our Primi menu. Fresh & delicious Italian dishes. To delight your taste buds.',
    info: 'Mezze manic he al ragu Pasta al ragu',
  },
]
const OurMenuSection = () => {
  return (
    <section className="my-10 grid justify-center gap-10 text-center md:my-20">
      <SectionHeading className="mx-auto">Our Menu</SectionHeading>
      <div className="grid gap-1">
        <p>
          Menu completo: primo + secondo + contorno e acqua ={' '}
          <span className="rounded-md bg-primary px-2 text-white">11€</span>
        </p>
        <p>
          Menu primo: primo + acqua ={' '}
          <span className="rounded-md bg-primary px-2 text-white">6€</span>
        </p>
        <p>
          Menu secondo: secondo + contorno + acqua ={' '}
          <span className="rounded-md bg-primary px-2 text-white">8€</span>
        </p>
        <p>
          Menu studenti: Piatto unico ={' '}
          <span className="rounded-md bg-primary px-2 text-white">7,50€</span>
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {menu.map(({ id, description, title, amount }) => (
          <div
            key={id}
            className="mx-auto grid w-full max-w-72 gap-5 rounded-3xl bg-white p-2 shadow-lg"
          >
            <Image
              width={500}
              height={500}
              alt="PRIMI €5"
              src="/images/products/p-2.png"
              className="rounded-3xl shadow"
            />
            <p className="text-2xl">
              {title}{' '}
              <span className="rounded-full bg-primary px-3 font-normal text-white">
                €{amount}
              </span>
            </p>
            <div className="grid gap-3 px-6 text-neutral-700">
              <p className="text-sm">{description}</p>
            </div>
            <LinkButton
              href="/products"
              className="mx-2 mb-2 rounded-b-3xl rounded-t-md"
            >
              Buy Now
            </LinkButton>
          </div>
        ))}
      </div>
      <div className="relative flex justify-center">
        <LinkButton className="relative z-10" href="/products">
          Explore More
        </LinkButton>
        <div className="absolute bottom-0 top-0 my-auto h-px w-full bg-gradient-to-r from-transparent via-orange-700 to-transparent" />
      </div>
    </section>
  )
}

export default OurMenuSection
