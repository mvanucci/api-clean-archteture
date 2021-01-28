import { AccountModel } from '../../../domain/models/AccountModel'

export interface LoadAccountByEmailRepository{
  loadByEmail: (email: string) => Promise<AccountModel>
}
