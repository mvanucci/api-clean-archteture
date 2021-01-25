import request from 'supertest'
import app from '../config/app'

describe('SinUp Routes', () => {
  test('should return an account on success',async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Murilo',
        email: 'murilo_vanucci@hotmail.com',
        password: '123',
        passowrdConfirmation: '123'
      })
      .expect(200)
  })
})
