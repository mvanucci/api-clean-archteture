import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper'
import { AccountMongoRepository } from './account'
import { mockAddAccountParams } from '@/domain/test/mock-account'
import faker from 'faker'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('should return an account on add success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const account = await sut.add(addAccountParams)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })
  })

  describe('loadByEmail()', () => {
    test('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const result = await accountCollection.insertOne(addAccountParams)
      const fakeAccount = result.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeAccount._id, accessToken)
      const account = await accountCollection.findOne({ _id: result.ops[0]._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.random.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.random.uuid()
    })

    test('should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: ''
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeFalsy()
    })

    test('should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeFalsy()
    })
  })
})
