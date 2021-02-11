import { AccountModel } from '@/domain/models/AccountModel'
import { AddAccountParams } from '@/domain/usecases/account/AddAccount'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
