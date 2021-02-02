import { Authentication } from './../../../domain/usecases/authentication'
import { HttpResponse, HttpRequest, Controller, AddAccount } from './signup-protocols'
import { badRequest, serverError, Ok } from '../../helpers/http/HttpHelpers'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      await this.authentication.auth({ email, password })
      return Ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
