'use client'

import Image from 'next/image'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const products = [
  {
    id: 1,
    image: '/images/products/p-4.png',
    title: 'PIZZA CAPRICCIOSA',
    details: '( Pomodoro - mozerella - funghi - cotto - olive )',
  },
  {
    id: 2,
    image: '/images/products/p-5.png',
    title: 'PIADINA KEBAP',
    details: '( Chicken - Pomodoro - Onion - Sauce - Ketchup - Lettuce )',
  },
  {
    id: 3,
    image: '/images/products/p-6.png',
    title: "PENNE ALL'ARRABBIATA",
    details: '( Pasta -  Spicy Tomato Sauce )',
  },
  {
    id: 4,
    image: '/images/products/p-4.png',
    title: 'PIZZA CAPRICCIOSA',
    details: '( Pomodoro - mozerella - funghi - cotto - olive )',
  },
  {
    id: 5,
    image: '/images/products/p-5.png',
    title: 'PIADINA KEBAP',
    details: '( Chicken - Pomodoro - Onion - Sauce - Ketchup - Lettuce )',
  },
  {
    id: 6,
    image: '/images/products/p-6.png',
    title: "PENNE ALL'ARRABBIATA",
    details: '( Pasta -  Spicy Tomato Sauce )',
  },
]

const responsive: ResponsiveType = {
  superLargeDesktop: { items: 6, breakpoint: { max: 4000, min: 3000 } },
  desktop: { items: 6, breakpoint: { max: 3000, min: 1024 } },
  tablet: { items: 6, breakpoint: { max: 1024, min: 464 } },
  mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
}

const ProductCarousel = () => {
  return (
    <Carousel
      ssr
      infinite
      autoPlay
      arrows={false}
      autoPlaySpeed={3000}
      responsive={responsive}
    >
      {products.map(({ id, image, title, details }) => (
        <div
          key={id}
          className="relative mx-3 mb-6 mt-28 rounded-3xl bg-white p-6 pt-32 shadow-lg md:min-w-72"
        >
          <Image
            height={230}
            width={230}
            alt="p"
            src={image}
            className="absolute -top-28 left-0 right-0 mx-auto drop-shadow-xl"
          />
          <h2 className="mb-3 text-2xl">{title}</h2>
          <p className="text-neutral-700">{details}</p>
        </div>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
