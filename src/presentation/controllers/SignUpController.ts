import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamsErrors } from '../errors/MissingParamsErrors'
import { badRequest } from '../helpers/HttpHelpers'
import { Controller } from '../protocols/Controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsErrors(field))
      }
    }
  }
}
