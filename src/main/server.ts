import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(5050, () => console.log(`Server runnung at http://localhost:${env.port}`))
  })
  .catch(console.error)
