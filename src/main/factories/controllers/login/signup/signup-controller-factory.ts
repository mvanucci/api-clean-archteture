import { SignUpController } from '@/presentation/controllers/login/signup/SignUpController'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
