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
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamsErrors('email'))))
    }

    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamsErrors('password'))))
    }

    const isValid = this.emailValidator.isValid('any_email@mail.com')
    if (!isValid) {
      return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }
  }
}
