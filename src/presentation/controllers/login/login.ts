import { MissingParamsErrors } from './../../errors/MissingParamsErrors'
import { badRequest } from '../../helpers/HttpHelpers'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller } from './../../protocols/Controller'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(badRequest(new MissingParamsErrors('email'))))
  }
}
