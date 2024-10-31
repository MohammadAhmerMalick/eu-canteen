import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 text-center text-neutral-300">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="mx-auto max-w-72 border-b border-primary pb-3 md:mx-0 md:max-w-full md:border-b-0 md:border-r">
            <p className="mb-2 font-semibold uppercase">Contact Us</p>
            <p className="font-light">3420500567</p>
            <p className="font-light">info@poolaster.com</p>
          </div>
          <div className="mx-auto max-w-72 border-b border-primary pb-3 md:mx-0 md:max-w-full md:border-b-0 md:border-r">
            <p className="mb-2 font-semibold uppercase">Address</p>
            <p className="font-light">
              Clover Sport Village, 12 21562 . Milan . Italy
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
            <Image
              height={120}
              width={80}
              src="/images/logo.svg"
              alt="Poolaster"
              className="w-16"
            />
          </div>
          <div className="absolute bottom-0 top-0 my-auto h-px w-full bg-gradient-to-r from-orange-950 via-primary to-orange-950" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-sm md:-mt-12 md:justify-between">
          <p className="flex gap-3">
            <span className="uppercase">Pinterest</span>
            <span className="w-0.5 bg-primary" />
            <span className="uppercase">Facebook</span>
            <span className="w-0.5 bg-primary" />
            <span className="uppercase">Instagram</span>
          </p>

          <p>© 2024 Poolaster, ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
