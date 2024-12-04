import { eq, getTableColumns, inArray } from 'drizzle-orm'

import db from '@/database/index'
import productsTable from '@/database/schema/productsSchema'

class ProductModel {
  static getProducts = () =>
    db.select().from(productsTable).where(eq(productsTable.published, true))

  static getAllProducts = () => db.select().from(productsTable)

  static getProduct = (id: string) =>
    db.select().from(productsTable).where(eq(productsTable.id, id))

  static createProduct = (product: typeof productsTable.$inferInsert) =>
    db
      .insert(productsTable)
      .values(product)
      .returning(getTableColumns(productsTable))

  static updateProduct = (product: typeof productsTable.$inferInsert) =>
    db
      .update(productsTable)
      .set(product)
      .where(eq(productsTable.id, product.id || ''))
      .returning(getTableColumns(productsTable))

  static deleteProduct = (id: string) =>
    db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning({ id: productsTable.id })

  static updateProductsPublishedState = (
    ids: string[],
    published: (typeof productsTable.$inferInsert)['published']
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
