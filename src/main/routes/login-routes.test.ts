import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper'
import app from '@/main/config/app'

let accountCollection: Collection

describe('Login Routes', () => {
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

  describe('POST /sinup', () => {
    test('should return 200 SignUp', async () => {
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

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Murilo',
        email: 'murilo_vanucci@hotmail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'murilo_vanucci@hotmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'murilo_vanucci@hotmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
