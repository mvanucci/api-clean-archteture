import { AddAccount } from '@/domain/usecases/AddAccount'
import { BcryptAdapter } from '@/infra/criptografy/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/add-account-mongo-repository'
import { DbAddAccount } from '@/data/usecases/db-add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
