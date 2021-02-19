import { JwtAdapter } from '@/infra/criptografy/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/add-account-mongo-repository'
import { DbLoadAccountByToken } from '@/data/usecases/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
