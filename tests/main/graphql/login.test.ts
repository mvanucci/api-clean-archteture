import { makeApolloServer } from './helpers'
import { ApolloServer, gql } from 'apollo-server-express'
import { MongoHelper } from '@/infra/db'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { createTestClient } from 'apollo-server-integration-testing'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('Login Query', () => {
    const loginQuery = gql`
      query login ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
          accessToken
          name
        }
      }
    `
    test('Should return an account on valid credencials', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Murilo',
        email: 'murilo_vanucci@hotmail.com',
        password
      })
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'murilo_vanucci@hotmail.com',
          password: '123'
        }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Murilo')
    })

    test('Should return UnauthorizedError on invalid credencials', async () => {
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'murilo_vanucci@hotmail.com',
          password: '123'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const signUpMutation = gql`
      mutation signUp ($name: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
        signUp (name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm) {
          accessToken
          name
        }
      }
    `

    test('Should return an account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signUpMutation, {
        variables: {
          name: 'Murilo',
          email: 'murilo_vanucci@hotmail.com',
          password: '123',
          passwordConfirm: '123'
        }
      })
      expect(res.data.signUp.accessToken).toBeTruthy()
      expect(res.data.signUp.name).toBe('Murilo')
    })
  })
})
