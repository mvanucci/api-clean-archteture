import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from './../errors/AccessDeniedError'
import { forbidden } from './../helpers/http/HttpHelpers'

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token is found exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
