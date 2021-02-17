import { AccountModel, AddAccount, Authentication, AuthenticationParams, LoadAccountByToken } from '@/domain'
import { AuthenticationModel } from '@/domain/models/AuthenticationModel'
import { mockAccountModel } from '@/tests/domain/mock'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  isValis = true
  addAccountParams: AddAccount.Params

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.isValis
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role

    return this.accountModel
  }
}
