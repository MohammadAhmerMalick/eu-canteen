import React from 'react'
import Image from 'next/image'

import Header from '@/sections/Header'
import LinkButton from '@/components/common/LinkButton'

const NotFoundPage = () => {
  return (
    <div className="grid h-dscreen grid-rows-[0px_auto] bg-primary-light">
      <Header />
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4">
        <div className="flex items-center justify-center gap-4 text-center">
          <span className="playfair-display-regular -mt-14 text-9xl md:-mt-36 md:text-[320px]">
            4
          </span>
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary md:h-60 md:w-60">
            <Image
              height={120}
              width={80}
              src="/images/logo-white-crown.svg"
              alt="Poolaster"
              className="w-16 md:w-32"
            />
          </div>
          <span className="playfair-display-regular -mt-14 -scale-x-100 text-9xl md:-mt-36 md:text-[320px]">
            4
          </span>
        </div>
        <p className="max-w-xl text-center md:text-lg">
          Whoops, nothing delicious to find here. Seems like the page you trying
          to find is no longer available,
        </p>
        <LinkButton href="/">Back To Home</LinkButton>
      </main>
    </div>
  )
}

export default NotFoundPage
