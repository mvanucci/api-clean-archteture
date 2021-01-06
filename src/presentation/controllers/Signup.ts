import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamsErrors } from '../errors/MissingParamsErrors'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsErrors('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamsErrors('email')
      }
    }
  }
}
