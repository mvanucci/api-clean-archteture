import { DbAuthentication } from '@/data'
import { Authentication } from '@/domain'
import { BcryptAdapter } from '@/infra/criptografy/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptografy/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
