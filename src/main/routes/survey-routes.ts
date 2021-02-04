import { makeAuthMiddleware } from './../factories/middleware/auth-middleware-factory'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptRoute } from '../adapter/express-route-adapter'
import { Router } from 'express'
import { adaptMiddleware } from '../adapter/express-middleware-route-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
