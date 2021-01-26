import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongodb-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should return an account on success',async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Murilo',
        email: 'murilo_vanucci@hotmail.com',
        password: '123',
        passwordConfirm: '123'
      })
      .expect(200)
  })
})
