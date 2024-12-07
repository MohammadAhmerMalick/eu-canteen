import { and, eq, inArray } from 'drizzle-orm'

import db from '@/database/index'
import productsTable, { type Product } from '@/database/schema/productsSchema'
import categoriesTable from '@/database/schema/categoriesSchema'

class ProductModel {
  static getProducts = () =>
    db
      .select()
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId)
      )
      .where(
        and(
          eq(productsTable.published, true),
          eq(categoriesTable.published, true)
        )
      )

  static getAllProducts = () =>
    db
      .select()
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId)
      )

  static getProduct = (id: string) =>
    db
      .select()
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesTable.id, productsTable.categoryId)
      )
      .where(eq(productsTable.id, id))

  static createProduct = (product: Product) =>
    db.insert(productsTable).values(product).returning({ id: productsTable.id })

  static updateProduct = (product: Product) =>
    db
      .update(productsTable)
      .set(product)
      .where(eq(productsTable.id, product.id || ''))
      .returning({ id: productsTable.id })

  static deleteProduct = (id: string) =>
    db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning({ id: productsTable.id })

  static updateProductsPublished = (
    ids: string[],
    published: Product['published']
  ) =>
    db
      .update(productsTable)
      .set({
        published,
      })
      .returning({
        id: productsTable.id,
      })
      .where(inArray(productsTable.id, ids))
}

export default ProductModel
