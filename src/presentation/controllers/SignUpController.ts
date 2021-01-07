import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamsErrors } from '../errors/MissingParamsErrors'
import { badRequest, serverError } from '../helpers/HttpHelpers'
import { Controller } from '../protocols/Controller'
import { EmailValidator } from '../protocols/EmailValidator'
import { InvalidParamError } from '../errors/InvalidParamError'

export class SignUpController implements Controller {
  emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsErrors(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
