'use client'

import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import ProductCard from '@/components/ProductCard'
import DataError from '@/components/common/DataError'
import type { Product } from '@/database/schema/productsSchema'
import CategoryTabCell from '@/components/common/CategoryTabCell'
import type { Category } from '@/database/schema/categoriesSchema'
import getProductsAction from '@/actions/product/getProductsAction'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import CreateCheckoutModal from '@/components/modals/product/CreateCheckoutModal'

const dataErrorMessage = 'Unable to load products'

const MenuPage = () => {
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
    <div>
      {checkoutModalData && (
        <CreateCheckoutModal
          product={checkoutModalData}
          isOpen={!!checkoutModalData}
          setOpen={() => setCheckoutModalData(null)}
        />
      )}

      <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 md:gap-4 md:pt-4">
        {categories.map((category) => (
          <CategoryTabCell
            key={category.id}
            category={category}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </section>
      <section className="mx-auto max-w-7xl py-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products
            .filter(
              ({ products: product }) =>
                product.categoryId === activeCategory?.id
            )
            .map(({ products: product }) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => setCheckoutModalData(product)}
              />
            ))}
        </div>
      </section>
    </div>
  )
}

export default MenuPage
