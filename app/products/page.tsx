'use client'

import Image from 'next/image'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import Loading from '@/components/common/Loading'
import DataError from '@/components/common/DataError'
import productsTable from '@/database/schema/productsSchema'
import categoriesTable from '@/database/schema/categoriesSchema'
import getAllProductsAction from '@/actions/product/getAllProductsAction'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import CreateCheckoutModal from '@/components/modals/product/CreateCheckoutModal'

const dataErrorMessage = 'Unable to load products'

const ProductPage = () => {
  const { products, setProducts } = useStore((state) => state)
  const { categories, setCategories } = useStore((state) => state)

  const [activeCategory, setActiveCategory] = useState<
    typeof categoriesTable.$inferInsert | null
  >(null)
  const [checkoutModalData, setCheckoutModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(products[0])

  const { isPending, error } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const { data, success } = await getAllProductsAction()
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
          onClose={() => setCheckoutModalData(null)}
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
                src={`/images/categories/${category.image}`}
              />
              <p>{category.name}</p>
            </button>
          ))}
        </section>
        <section className="mx-auto max-w-7xl py-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products
              .filter(({ categoryId }) => categoryId === activeCategory?.id)
              .map((product) => (
                <div
                  key={product.id}
                  className="mx-auto grid w-full max-w-72 gap-5 rounded-3xl bg-white p-2 shadow-sm duration-300 hover:shadow-lg"
                >
                  <div className="rounded-3xl bg-primary-light p-2 shadow">
                    <Image
                      width={140}
                      height={112}
                      alt="PRIMI €5"
                      className="m-auto max-h-28 object-contain"
                      src="/images/products/p-1.png"
                    />
                  </div>

                  <div className="grid gap-1 px-6">
                    <h2 className="text-xl font-semibold">Fried Noodles</h2>
                    <p className="text-sm">
                      Mezze manic he al ragu Pasta al ragu
                    </p>
                    <span className="text-2xl">
                      €{Number(product.price).toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="mx-2 mb-2 rounded-b-3xl rounded-t-md"
                    onPress={() => setCheckoutModalData(product)}
                  >
                    Buy Now
                  </Button>
                </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProductPage
