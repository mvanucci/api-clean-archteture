import { AccountModel } from '@/domain/models/AccountModel'

export interface LoadAccountByToken {
  load: (token: string, role?: string) => Promise<AccountModel>
}
