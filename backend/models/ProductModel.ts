import { eq } from 'drizzle-orm'

import db from '@/database/index'
import productsTable from '@/database/schema/productsSchema'

class ProductModel {
  static getProducts = () =>
    db.select().from(productsTable).where(eq(productsTable.published, true))

  static getAllProducts = () => db.select().from(productsTable)

  static getProduct = (id: string) =>
    db.select().from(productsTable).where(eq(productsTable.id, id))

  static getProductByName = (name: string) =>
    db.select().from(productsTable).where(eq(productsTable.name, name))

  static createProduct = (product: typeof productsTable.$inferInsert) =>
    db.insert(productsTable).values(product).returning({ id: productsTable.id })

  static updateProduct = (product: typeof productsTable.$inferInsert) =>
    product.id &&
    db
      .update(productsTable)
      .set(product)
      .returning({ id: productsTable.id })
      .where(eq(productsTable.id, product.id))

  static deleteProduct = (id: string) =>
    db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning({ id: productsTable.id })
}

export default ProductModel
