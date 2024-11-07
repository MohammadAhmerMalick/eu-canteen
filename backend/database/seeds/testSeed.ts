import db from '@/database/index'
import testData from '@/database/data/testData'
import testSchema from '@/database/schema/testSchema'

const testSeed = async () => {
  await db.delete(testSchema)
  await db.insert(testSchema).values(testData)
}

export default testSeed
