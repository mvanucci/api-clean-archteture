import { AccessDeniedError } from './../errors/AccessDeniedError'
import { forbidden, Ok, serverError } from './../helpers/http/HttpHelpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) {
          return Ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
