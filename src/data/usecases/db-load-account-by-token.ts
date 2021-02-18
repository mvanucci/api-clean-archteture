import { LoadAccountByToken } from '@/domain'
import { Decrypter, LoadAccountByTokenRepository } from '@/data'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (token: string, role?: string): Promise<LoadAccountByToken.Result> {
    let accessToken: string
    try {
      accessToken = await this.decrypter.decrypt(token)
    } catch (error) {
      return null
    }

    if (accessToken) {
      const account = await this.loadAccountByTokenRepository.loadByToken(token, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
