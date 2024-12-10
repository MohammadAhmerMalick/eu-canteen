'use client'

import Image from 'next/image'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import ProductCard from '@/components/ProductCard'
import DataError from '@/components/common/DataError'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import type { Product } from '@/database/schema/productsSchema'
import { type Category } from '@/database/schema/categoriesSchema'
import getProductsAction from '@/actions/product/getProductsAction'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import CreateCheckoutModal from '@/components/modals/product/CreateCheckoutModal'

const dataErrorMessage = 'Unable to load products'

const ProductPage = () => {
  const { products, setProducts } = useStore((state) => state)
  const { categories, setCategories } = useStore((state) => state)

  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [checkoutModalData, setCheckoutModalData] = useState<Product | null>(
    null
  )

  const { isPending, error } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const { data, success } = await getProductsAction()
      if (success) setProducts(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const getCategories = useCallback(async () => {
    const { data } = await getAllCategoriesAction()
    setCategories(data)
  }, [setCategories])

  useEffect(() => {
    if (!categories.length) getCategories()
    else setActiveCategory(categories[0])
  }, [getCategories, categories, categories.length])

  if (isPending || !categories.length || !activeCategory?.id) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div className="min-h-screen bg-primary-light">
      {checkoutModalData && (
        <CreateCheckoutModal
          product={checkoutModalData}
          isOpen={!!checkoutModalData}
          setOpen={() => setCheckoutModalData(null)}
        />
      )}
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
              width={320}
              height={190}
              alt="PRIMI €5"
              className="absolute right-0 h-auto w-40 drop-shadow-lg md:right-14 md:w-80"
              src="/images/banners/dish-1.png"
            />
          </div>
        </section>
        <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 md:gap-4 md:pt-4">
          {categories.map((category) => (
            <button
              onClick={() => setActiveCategory(category)}
              key={category.id}
              className={classnames(
                'flex items-center gap-2 rounded-3xl border py-2 pl-3 pr-5 ring-1 duration-300',
                activeCategory?.id === category.id
                  ? 'border-primary bg-primary-light shadow ring-orange-200'
                  : 'border-white bg-white ring-orange-200'
              )}
            >
              <Image
                width={40}
                height={40}
                alt={category.name}
                className="h-9 w-auto"
                src={
                  category.image
                    ? `${assetsBaseUrl}${category.image}`
                    : '/images/product/p-1.png'
                }
              />
              <p>{category.name}</p>
            </button>
          ))}
        </section>
        <section className="mx-auto max-w-7xl py-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products
              .filter(
                ({ categories: category }) =>
                  category?.id === activeCategory?.id
              )
              .map(({ products: product }) => (
                <ProductCard
                  product={product}
                  onPress={() => setCheckoutModalData(product)}
                  key={product.id}
                />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProductPage
