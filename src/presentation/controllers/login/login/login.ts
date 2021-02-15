import { badRequest, Ok, serverError, unauthorized } from '@/presentation/helpers/http/HttpHelpers'
import { HttpRequest, HttpResponse, Controller, Authentication, Validation } from './login-protocols'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (authentication: Authentication, validation: Validation) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authenticationModel = await this.authentication.auth({ email, password })
      if (!authenticationModel) {
        return unauthorized()
      }

      return Ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
