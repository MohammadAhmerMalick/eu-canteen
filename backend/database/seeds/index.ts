import rolesSeed from '@/database/seeds/rolesSeed'
import usersSeed from '@/database/seeds/usersSeed'
import categoriesSeed from '@/database/seeds/categoriesSeed'

import productsSeed from '@/database/seeds/productsSeed'
import notifications from '@/database/seeds/notificationsSeed'

const init = async () => {
  await rolesSeed()
  const users = await usersSeed()
  notifications(users)

  const categories = await categoriesSeed()
  productsSeed(categories)
}

init()
