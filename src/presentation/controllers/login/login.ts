import { InvalidParamError } from './../../errors/InvalidParamError'
import { EmailValidator } from './../../protocols/EmailValidator'
import { MissingParamsErrors } from './../../errors/MissingParamsErrors'
import { badRequest } from '../../helpers/HttpHelpers'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller } from './../../protocols/Controller'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamsErrors('email'))))
    }

    if (!password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamsErrors('password'))))
    }

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }
  }
}
