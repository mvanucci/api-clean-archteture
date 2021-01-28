export interface UpdateAccessTokenRepository {
  update: (id: string, token: string) => void
}
