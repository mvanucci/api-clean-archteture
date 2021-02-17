import { makeAddSurveyController } from '@/main/factories/controllers/add-survey-controller-factory'
import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { Router } from 'express'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { makeLoadSurveyController } from '@/main/factories/controllers/load-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}
