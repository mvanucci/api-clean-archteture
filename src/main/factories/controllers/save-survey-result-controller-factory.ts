import { makeDbSaveSurveysResult } from '@/main/factories/usecases/db-save-surveys-result-factory'
import { makeDbLoadAnswersBySurvey } from '@/main/factories/usecases'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/save-survey-result-controller'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveysResult())
  return makeLogControllerDecorator(controller)
}
