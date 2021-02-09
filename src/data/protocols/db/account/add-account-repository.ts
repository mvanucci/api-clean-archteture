import { AccountModel } from '@/domain/models/AccountModel'
import { AddAccountParams } from '@/domain/usecases/AddAccount'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
