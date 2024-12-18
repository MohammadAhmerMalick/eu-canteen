import React from 'react'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'

import { classnames, CONSTANTS } from '@/utils'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import { type Category } from '@/database/schema/categoriesSchema'

interface CategoryTabCellProps {
  category: Category
  activeCategory: Category | null
  setActiveCategory: Dispatch<SetStateAction<Category | null>>
}

const CategoryTabCell = ({
  category,
  activeCategory,
  setActiveCategory,
}: CategoryTabCellProps) => {
  return (
    <button
      onClick={() => setActiveCategory(category)}
      key={category.id}
      className={classnames(
        'flex items-center gap-2 rounded-lg border py-1 pl-2 pr-4 ring-1 duration-300 md:py-2 md:pl-3 md:pr-5',
        activeCategory?.id === category.id
          ? 'border-primary bg-primary-light shadow ring-orange-200'
          : 'border-white bg-white ring-orange-200'
      )}
    >
      <Image
        width={40}
        height={40}
        alt={category.name}
        className="h-5 w-auto md:h-9"
        src={
          category.image
            ? `${assetsBaseUrl}${category.image}`
            : CONSTANTS.imagePlaceholders.product
        }
      />
      <p className="text-sm md:text-base">{category.name}</p>
    </button>
  )
}

export default CategoryTabCell
