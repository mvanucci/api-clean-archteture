import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamsErrors } from '../errors/MissingParamsErrors'
import { badRequest } from '../helpers/HttpHelpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsErrors(field))
      }
    }
  }
}
