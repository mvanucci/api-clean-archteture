import { AccountModel } from '../models/AccountModel'

export interface LoadAccountByToken {
  load: (token: string) => Promise<AccountModel>
}
