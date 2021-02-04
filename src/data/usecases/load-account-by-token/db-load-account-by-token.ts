import { AccountModel } from '../../../domain/models/AccountModel'
import { Decrypter } from '../../protocols/criptografy/decrypter'
import { LoadAccountByToken } from './../../../domain/usecases/LoadAccountByToken'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
