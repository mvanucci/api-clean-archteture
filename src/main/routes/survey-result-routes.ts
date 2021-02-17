import { makeSaveSurveyResultController } from '@/main/factories/controllers/save-survey-result-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { Router } from 'express'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/load-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
