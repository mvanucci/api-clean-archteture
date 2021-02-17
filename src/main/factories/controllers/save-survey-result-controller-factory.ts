import { makeDbSaveSurveysResult } from '@/main/factories/usecases/db-save-surveys-result-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id-factory'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/save-survey-result-controller'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveysResult())
  return makeLogControllerDecorator(controller)
}
