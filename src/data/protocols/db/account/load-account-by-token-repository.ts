import { AccountModel } from '../../../../domain/models/AccountModel'

export interface LoadAccountByTokenRepository{
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
