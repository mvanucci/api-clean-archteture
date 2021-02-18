import { AccountModel } from '@/domain/models/AccountModel'

export interface LoadAccountByTokenRepository{
  loadByToken: (token: string, role?: string) => Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export type Result = AccountModel
}
