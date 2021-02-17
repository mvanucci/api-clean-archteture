import { makeDbLoadSurveys } from '@/main/factories/usecases/db-load-surveys-factory'
import { LoadSurveysController } from '@/presentation/controllers/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
