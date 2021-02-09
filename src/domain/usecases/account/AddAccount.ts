import { AccountModel } from '@/domain/models/AccountModel'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
