import { AccountModel } from '@/domain'

export interface LoadAccountByToken {
  load: (token: string, role?: string) => Promise<AccountModel>
}
