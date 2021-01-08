import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './SignUpProtocols'
import { MissingParamsErrors, InvalidParamError } from '../../errors'
import { badRequest, serverError, Ok } from '../../helpers/HttpHelpers'

export class SignUpController implements Controller {
  emailValidator: EmailValidator
  addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsErrors(field))
        }
      }
      const { name, email, password, passwordConfirm } = httpRequest.body
      if (password !== passwordConfirm) {
        return badRequest(new InvalidParamError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = this.addAccount.add({
        name,
        email,
        password
      })

      return Ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
