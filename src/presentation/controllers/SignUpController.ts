import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamsErrors } from '../errors/MissingParamsErrors'
import { badRequest } from '../helpers/HttpHelpers'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsErrors('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsErrors('email'))
    }
  }
}
