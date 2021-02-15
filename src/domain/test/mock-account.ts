import { AddAccountParams } from '@/domain/usecases/account/AddAccount'
import { AccountModel } from '@/domain/models/AccountModel'
import { AuthenticationParams } from '@/data/usecases/account/authentication/db-authentication-protocols'
import faker from 'faker'

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
