import db from '@/database/index'
import productsData from '@/database/data/productsData'
import productsSchema from '@/database/schema/productsSchema'

const productsSeed = async (ids: { id: string }[]) => {
  await db.delete(productsSchema)
  await db.insert(productsSchema).values(productsData(ids))
}

export default productsSeed
