import { MongoHelper as sut } from './mongodb-helper'

beforeAll(async () => {
  await sut.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await sut.disconnect()
})

describe('Mongo Helper', () => {
  test('should reconnect if mongodb is down', async () => {
    let accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    // await sut.disconnect()

    accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
