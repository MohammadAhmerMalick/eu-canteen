import db from '@/database/index'
import productsData from '@/database/data/productsData'
import productsSchema from '@/database/schema/productsSchema'

const productsSeed = async () => {
  await db.delete(productsSchema)
  await db.insert(productsSchema).values(productsData)
}

export default productsSeed
