import Link from 'next/link'
import Image from 'next/image'

import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import Button from '@/components/Button'
import OurMenuSection from '@/sections/OurMenuSection'
import SectionHeading from '@/components/SectionHeading'
import VideoBannerSection from '@/sections/VideoBannerSection'
import AgentAssistance from '@/components/AgentAssistance'
import ProductCarousel from '@/components/ProductCarousel'

const HomePage = async () => {
  return (
    <div className="w-screen overflow-hidden bg-primary-light">
      <Header />
      <main className="mx-auto max-w-7xl px-4">
        <section className="my-10 grid grid-cols-1 gap-4 gap-y-12 md:mt-20 md:grid-cols-[500px_2000px]">
          <div className="text-center md:text-start">
            <h1 className="bellota-light text-5xl uppercase md:text-7xl">
              <span className="playfair-display-regular">Poolaster</span>
              <span className="mx-auto -mt-4 mb-2 block h-2 w-[280px] bg-primary md:mx-0 md:-mt-5 md:h-3 md:w-[420px]" />
              <span>Restaurant</span>
            </h1>

            <p className="mt-4 md:max-w-[400px]">
              Savor the essence of exquisite flavors at poolaster RESTAURANT,
              where culinary artistry meets timeless elegance.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-3xl bg-primary px-4 py-2 text-white"
            >
              Explore More
            </Link>
          </div>
          <ProductCarousel />
        </section>
        <AgentAssistance className="ml-auto mt-4" expended />
        <section className="my-10 md:my-20">
          <Image
            width={1280}
            height={600}
            alt="banner"
            src="/images/banners/banner-1.png"
            className="mx-auto"
          />
        </section>
        <section className="my-10 grid justify-center gap-8 text-center md:my-20">
          <Image
            width={178}
            height={63}
            alt="For the best memories"
            src="/images/extras/h1-icon-img.png.png"
            className="mx-auto"
          />
          <SectionHeading>
            Poolaster is for everyone who collects beautiful moments
          </SectionHeading>
          <h3 className="mrs-saint-delafield-regular text-3xl text-orange-700/50">
            For the best memories
          </h3>
        </section>
        <section className="my-10 grid justify-between gap-10 text-center md:my-20 md:grid-cols-2 md:text-left">
          <div>
            <SectionHeading>
              ONLY THE FINEST <br />
              FOOD & GREAT SERVICE
            </SectionHeading>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod temporincididunt ut labore et dolore agna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea ommodo consequat.
            </p>

            <Button className="mt-6">Read More</Button>
          </div>
          <Image
            width={320}
            height={3025}
            alt="Only The Finest Food & Great Service"
            src="/images/banners/service-banner.png"
            className="mx-auto hidden w-full max-w-80 md:block"
          />
        </section>
        <VideoBannerSection />
        <OurMenuSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
