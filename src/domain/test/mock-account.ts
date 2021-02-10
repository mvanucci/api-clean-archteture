import { AddAccountParams } from '@/domain/usecases/account/AddAccount'
import { AccountModel } from '@/domain/models/AccountModel'
import { AuthenticationParams } from '@/data/usecases/account/authentication/db-authentication-protocols'

export const mockAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

export const mockAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
