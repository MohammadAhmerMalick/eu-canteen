'use client'

import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const products = [
  {
    id: 1,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 2,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 3,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 4,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 5,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 6,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 7,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 8,
    image: '/images/products/p-1.png',
    title: 'Chinese Yakisbo',
    details:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
]

const responsive = {
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const ProductCarousel = () => {
  return (
    <Carousel
      ssr
      responsive={responsive}
      infinite
      autoPlay
      arrows={false}
      autoPlaySpeed={3000}
    >
      {products.map(({ id, image, title, details }) => (
        <div
          key={id}
          className="relative mx-3 mb-2 mt-28 rounded-3xl bg-white p-6 pt-32 shadow-lg md:min-w-72"
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
