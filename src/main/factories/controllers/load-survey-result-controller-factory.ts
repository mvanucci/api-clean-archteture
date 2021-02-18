import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/load-survey-result-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/loud-survey-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbCheckSurveyById } from '@/main/factories/usecases'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
