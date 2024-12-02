import React from 'react'
import Image from 'next/image'

const SevicesSecion = () => {
  return (
    <section className="my-10 md:my-20">
      <Image
        alt="banner"
        width={1280}
        height={600}
        className="mx-auto"
        src="/images/banners/banner-1.png"
      />

      <div className="relative z-10 mx-auto -mt-16 hidden w-fit flex-wrap items-center justify-center gap-y-4 rounded-3xl bg-white px-2 py-4 text-xs shadow-lg sm:flex">
        <div className="grid gap-3 px-8">
          <Image
            width={50}
            height={48}
            alt="Buffet"
            src="/images/extras/buffet-icon.svg"
            className="mx-auto h-8 drop-shadow md:h-14"
          />
          Buffet
        </div>
        <div className="grid gap-3 border-primary px-8 lg:border-l lg:px-8">
          <Image
            width={50}
            height={48}
            alt="Catering"
            src="/images/extras/catering-icon.svg"
            className="mx-auto h-8 drop-shadow md:h-14"
          />
          Catering
        </div>
        <div className="grid gap-3 border-primary px-8 lg:border-l">
          <Image
            width={50}
            height={48}
            alt="Air Conditioning"
            className="mx-auto h-8 drop-shadow md:h-14"
            src="/images/extras/air-conditioning-icon.svg"
          />
          Air Conditioning
        </div>
        <div className="grid gap-3 border-primary px-8 lg:border-l">
          <Image
            width={50}
            height={48}
            alt="Self Parking"
            src="/images/extras/self-parking-icon.svg"
            className="mx-auto h-8 drop-shadow md:h-14"
          />
          Self Parking
        </div>
        <div className="grid gap-3 border-primary px-8 lg:border-l">
          <Image
            width={50}
            height={48}
            alt="Private Events"
            className="mx-auto h-8 drop-shadow md:h-14"
            src="/images/extras/private-events-icon.svg"
          />
          Private Events
        </div>
        <div className="grid gap-3 border-primary px-8 lg:border-l">
          <Image
            width={50}
            height={48}
            alt="Smoking Area"
            src="/images/extras/smoking-area-icon.svg"
            className="mx-auto h-8 drop-shadow md:h-14"
          />
          Smoking Area
        </div>
        <div className="grid gap-3 border-primary px-8 lg:border-l">
          <Image
            width={50}
            height={48}
            alt="Pets Allowed"
            src="/images/extras/pets-allowed-icon.svg"
            className="mx-auto h-8 drop-shadow md:h-14"
          />
          Pets Allowed
        </div>
      </div>
    </section>
  )
}

export default SevicesSecion
