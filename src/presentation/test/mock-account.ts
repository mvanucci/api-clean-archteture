import { mockAccountModel } from '@/domain/test'
import { AccountModel, LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'
import { AddAccount, AddAccountParams, Authentication, AuthenticationParams } from '../controllers/login/signup/signup-protocols'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return this.accountModel
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  token = faker.random.uuid()

  async auth (authenticationParams: AuthenticationParams): Promise<string> {
    this.authenticationParams = authenticationParams
    return this.token
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
