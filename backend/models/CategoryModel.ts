import { eq, getTableColumns } from 'drizzle-orm'

import db from '@/database/index'
import categoriesTable from '@/database/schema/categoriesSchema'

class CategoryModel {
  static getCategories = () =>
    db.select().from(categoriesTable).where(eq(categoriesTable.published, true))

  static getAllCategories = () => db.select().from(categoriesTable)

  static getCategory = (id: string) =>
    db.select().from(categoriesTable).where(eq(categoriesTable.id, id))

  static getCategoryByName = (name: string) =>
    db.select().from(categoriesTable).where(eq(categoriesTable.name, name))

  static createCategory = (category: typeof categoriesTable.$inferInsert) =>
    db
      .insert(categoriesTable)
      .values(category)
      .returning(getTableColumns(categoriesTable))

  static updateCategory = (category: typeof categoriesTable.$inferInsert) =>
    db
      .update(categoriesTable)
      .set(category)
      .where(eq(categoriesTable.id, category.id || ''))
      .returning(getTableColumns(categoriesTable))

  static deleteCategory = (id: string) =>
    db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .returning({ id: categoriesTable.id })
}

export default CategoryModel
