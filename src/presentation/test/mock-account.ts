import { mockAccount } from '@/domain/test'
import { AccountModel, LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, hole?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}
