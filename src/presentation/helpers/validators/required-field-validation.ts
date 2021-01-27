import { MissingParamsErrors } from './../../errors/MissingParamsErrors'
import { Validation } from '../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamsErrors(this.fieldName)
    }
  }
}
