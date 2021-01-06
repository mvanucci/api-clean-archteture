export class MissingParamsErrors extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamsErrors'
  }
}
