import { AccountModel } from '@/domain/models/AccountModel'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
