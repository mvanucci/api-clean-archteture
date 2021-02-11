import { noCache } from './no-cache'
import request from 'supertest'
import app from '@/main/config/app'

describe('noCache Middleware', () => {
  test('should disable cors',async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expire', '0')
      .expect('surrogate-control', 'no-store')
  })
})
