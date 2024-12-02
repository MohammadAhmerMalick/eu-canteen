import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 text-center text-neutral-300">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="mx-auto max-w-72 border-b border-primary pb-3 md:mx-0 md:max-w-full md:border-b-0 md:border-r">
            <p className="mb-2 font-semibold uppercase">Contact Us</p>
            <a href="tel:+393420500567" className="block font-light">
              +39 342 050 0567
            </a>
            <a href="mailto:info@poolaster.com" className="font-light">
              info@poolaster.com
            </a>
          </div>
          <div className="mx-auto max-w-72 border-b border-primary pb-3 md:mx-0 md:max-w-full md:border-b-0 md:border-r">
            <p className="mb-2 font-semibold uppercase">Address</p>
            <p className="font-light">
              Address: Via Comasina, 115, 20161 Milan-Italy.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase">opening hours</p>
            <p className="font-light">
              Everyday : From 12.30 To 23.00 Kitchen Closes At 22.00
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
              <span className="uppercase">Pinterest</span>
              <span className="w-px bg-primary" />
              <span className="uppercase">Facebook</span>
              <span className="w-px bg-primary" />
              <span className="uppercase">Instagram</span>
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
            <p>
              Made with 💝 | A Product of Asmeron (Pvt.) Ltd & OS Tech Hub LLC
            </p>
            <p>© 2024 Poolaster, ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
