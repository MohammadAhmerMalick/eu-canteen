'use client'

import Image from 'next/image'
import { useState } from 'react'

import { classnames } from '@/utils'
import Header from '@/sections/Header'
import Button from '@/components/common/Button'

const menu = [
  {
    id: 1,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 2,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
  {
    id: 3,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 4,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
  {
    id: 5,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 6,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
  {
    id: 7,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 8,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
  {
    id: 9,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 10,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
  {
    id: 11,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 12,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
  {
    id: 13,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 1,
    image: '/images/products/p-1.png',
  },
  {
    id: 14,
    title: 'PRIMI €5',
    description: 'Gnocchi burro e salvia Gnocchi with butter and sage',
    info: 'Mezze manic he al ragu Pasta al ragu',
    category: 2,
    image: '/images/products/p-3.png',
  },
]

const categories = [
  { id: 1, name: 'Pasta', image: '/images/categories/pasta.png' },
  { id: 2, name: 'Chicken', image: '/images/categories/chicken.png' },
  { id: 3, name: 'Pizza', image: '/images/categories/pizza.png' },
  { id: 4, name: 'Vegetables', image: '/images/categories/vegetables.png' },
]

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1)
  return (
    <div className="min-h-screen bg-primary-light">
      <Header />
      <main className="px-4">
        <section className="mx-auto flex max-w-7xl gap-4 py-4">
          <div className="relative flex w-full items-center rounded-3xl bg-black md:h-52">
            <div className="z-10 w-full rounded-3xl bg-gradient-to-r from-transparent to-black px-4 py-6 text-white md:w-max md:px-10 md:py-10">
              <h1 className="philosopher-bold mb-2 text-xl md:text-3xl">
                It’s not just Food,
                <br /> it’s an Experience
              </h1>
              <p className="font-light">
                Order Your Favourite food & enjoy your day
              </p>
            </div>
            <Image
              width={300}
              height={300}
              alt="PRIMI €5"
              className="absolute right-0 w-40 drop-shadow-lg md:right-14 md:w-80"
              src="/images/banners/dish-1.png"
            />
          </div>
        </section>
        <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 md:gap-4 md:pt-4">
          {categories.map(({ id, image, name }) => (
            <button
              onClick={() => setActiveCategory(id)}
              key={id}
              className={classnames(
                'flex items-center gap-2 rounded-3xl border py-2 pl-3 pr-5 ring-1 duration-300',
                activeCategory === id
                  ? 'border-primary bg-primary-light shadow ring-orange-200'
                  : 'border-white bg-white ring-orange-200'
              )}
            >
              <Image src={image} alt={name} height={32} width={32} />
              <p>{name}</p>
            </button>
          ))}
        </section>
        <section className="mx-auto max-w-7xl py-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {menu
              .filter(({ category }) => category === activeCategory)
              .map(({ id, image }) => (
                <div
                  key={id}
                  className="mx-auto grid w-full max-w-72 gap-5 rounded-3xl bg-white p-2 shadow-sm duration-300 hover:shadow-lg"
                >
                  <div className="rounded-3xl bg-primary-light p-2 shadow">
                    <Image
                      width={140}
                      height={140}
                      alt="PRIMI €5"
                      className="m-auto max-h-28 object-contain"
                      src={image}
                    />
                  </div>

                  <div className="grid gap-1 px-6">
                    <h2 className="text-xl font-semibold">Fried Noodles</h2>
                    <p className="text-sm">
                      Mezze manic he al ragu Pasta al ragu
                    </p>
                    <span className="text-2xl">€5.08</span>
                  </div>
                  <Button className="mx-2 mb-2 rounded-b-3xl rounded-t-md">
                    Buy Now
                  </Button>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductPage
