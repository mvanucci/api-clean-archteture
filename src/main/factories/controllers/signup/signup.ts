import { LogMongoRepository } from '../../../../infra/db/mongodb/log-repository/log'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../../../presentation/controllers/signup/SignUpController'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log'
import { makeSignUpValidation } from './signup-validation'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { JwtAdapter } from '../../../../infra/criptografy/jwt-adapter/jwt-adapter'
import env from '../../../config/env'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const signupController = new SignUpController(dbAddAccount, makeSignUpValidation(), dbAuthentication)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
