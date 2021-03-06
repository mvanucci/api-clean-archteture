import { makeLoginValidation } from '@/main/factories/controllers/login-validation'
import { EmailValidator } from '@/validations/protocols/EmailValidator'
import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite, EmailValidation } from '@/validations/validators'

jest.mock('@/validations/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidaton Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
