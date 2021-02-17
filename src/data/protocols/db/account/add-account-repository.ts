import { AddAccount, AccountModel } from '@/domain'

export interface AddAccountRepository {
  add: (accountData: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}
export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AccountModel
}
