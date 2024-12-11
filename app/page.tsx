import Image from 'next/image'

import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import Button from '@/components/common/Button'
import SevicesSecion from '@/sections/SevicesSecion'
import OurMenuSection from '@/sections/OurMenuSection'
import LinkButton from '@/components/common/LinkButton'
import SectionHeading from '@/components/SectionHeading'
import QrBannerSection from '@/sections/QrBannerSection'
import AgentAssistance from '@/components/AgentAssistance'
import ProductCarousel from '@/components/ProductCarousel'
import VideoBannerSection from '@/sections/VideoBannerSection'

const HomePage = async () => {
  return (
    <div className="overflow-hidden bg-primary-light">
      <Header />
      <main className="mx-auto max-w-7xl px-4">
        <section className="my-10 grid grid-cols-1 gap-4 gap-y-12 md:mt-20 md:grid-cols-[500px_2000px]">
          <div className="text-center md:text-start">
            <h1 className="bellota-regular bellota-light text-5xl uppercase md:text-7xl">
              <span className="font-semibold">Poolaster</span>
              <span className="mx-auto -mt-4 mb-2 block h-2 w-[286px] bg-primary md:mx-0 md:-mt-5 md:h-3 md:w-[430px]" />
              <span className="text-4xl md:text-6xl">Bar - Osteria</span>
            </h1>

            <p className="mt-4 md:max-w-[400px]">
              From Italy’s Heart to Your Table, Immerse Yourself in the Art of
              True Italian Flavor.
            </p>

            <LinkButton className="mt-6" href="/products">
              Explore More
            </LinkButton>
          </div>
          <ProductCarousel />
        </section>
        <AgentAssistance className="ml-auto mt-4" expended />
        <SevicesSecion />
        <QrBannerSection />
        <section className="my-10 grid justify-center gap-8 text-center md:my-20">
          <Image
            width={178}
            height={63}
            className="mx-auto"
            alt="For the best memories"
            src="/images/extras/h1-icon-img.png"
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
              Delight in ELEGANCE, <br />
              FLAVOR & Comfort
            </SectionHeading>
            <p className="mt-4">
              At Poolaster, we believe that dining is more than just a meal—it’s
              an experience. Our chefs craft every dish with passion, blending
              fresh, locally sourced ingredients with culinary artistry to
              create flavors that linger in your memory. Whether you’re here for
              a casual meal or a special celebration, we promise to make every
              moment extraordinary.
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

        <section className="my-10 grid justify-center gap-8 text-center md:my-20">
          <Image
            width={178}
            height={63}
            className="mx-auto"
            alt="For the best memories"
            src="/images/extras/h1-icon-img.png"
          />
          <SectionHeading>
            ONLY THE FINEST ITALIAN FOOD & GREAT SERVICE
          </SectionHeading>
        </section>

        <OurMenuSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
