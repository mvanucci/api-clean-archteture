import { AccountModel } from '../../domain/models/AccountModel'

export interface LoadAccountByEmailRepository{
  load: (email: string) => Promise<AccountModel>
}
