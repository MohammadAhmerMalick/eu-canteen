import db from '@/database/index'
import categoriesData from '@/database/data/categoriesData'
import categoriesSchema from '@/database/schema/categoriesSchema'

const categoriesSeed = async () => {
  await db.delete(categoriesSchema)
  await db.insert(categoriesSchema).values(categoriesData)
}

export default categoriesSeed
