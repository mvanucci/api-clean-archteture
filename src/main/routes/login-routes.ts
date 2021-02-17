import { makeLoginController } from '@/main/factories/controllers/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/signup-controller-factory'
import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
