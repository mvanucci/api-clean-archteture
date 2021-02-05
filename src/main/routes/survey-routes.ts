import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptRoute } from '../adapter/express-route-adapter'
import { Router } from 'express'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'
import { makeLoadSurveyController } from '../factories/controllers/survey/load-surveys/load-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}
