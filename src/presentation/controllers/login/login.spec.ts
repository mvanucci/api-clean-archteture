import { MissingParamsErrors } from './../../errors/MissingParamsErrors'
import { badRequest } from '../../helpers/HttpHelpers'
import { LoginController } from './login'

describe('LoginController', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsErrors('email')))
  })
})
