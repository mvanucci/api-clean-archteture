import { AccountModel } from '../../../../domain/models/AccountModel'

export interface LoadAccountByTokenRepository{
  loadByToken: (toekn: string, role?: string) => Promise<AccountModel>
}
