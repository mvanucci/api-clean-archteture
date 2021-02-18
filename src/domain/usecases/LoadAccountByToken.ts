export interface LoadAccountByToken {
  load: (token: string, role?: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Result = {
    id: string
  }
}
