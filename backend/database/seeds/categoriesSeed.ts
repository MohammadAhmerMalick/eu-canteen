import db from '@/database/index'
import categoriesData from '@/database/data/categoriesData'
import categoriesTable from '@/database/schema/categoriesSchema'

const categoriesSeed = async () => {
  await db.delete(categoriesTable)
  return db
    .insert(categoriesTable)
    .values(categoriesData)
    .returning({ id: categoriesTable.id })
}

export default categoriesSeed
