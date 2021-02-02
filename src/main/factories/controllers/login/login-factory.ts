import { JwtAdapter } from './../../../../infra/criptografy/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from './../../../../infra/db/mongodb/account-repository/account'
import { makeLoginValidation } from './login-validation'
import { DbAuthentication } from './../../../../data/usecases/authentication/db-authentication'
import { LogMongoRepository } from './../../../../infra/db/mongodb/log-repository/log'
import { LoginController } from './../../../../presentation/controllers/login/login'
import { Controller } from './../../../../presentation/protocols/Controller'
import { LogControllerDecorator } from '../../../decorators/log'
import { BcryptAdapter } from '../../../../infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import env from '../../../config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
