import { AddAccountModel, AddAccount } from './../../../domain/usecases/AddAccount'
import { AccountModel } from '../../../domain/models/AccountModel'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
