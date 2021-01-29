import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongodb-helper'
import app from '../config/app'

describe('Login Routes', () => {
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
  describe('POST /sinup', () => {
    test('should return 200 SignUp',async () => {
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
})
