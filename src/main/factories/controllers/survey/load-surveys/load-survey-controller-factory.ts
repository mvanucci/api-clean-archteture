import { makeDbLoadSurveys } from './../../../usecases/survey/add-survey/load-survyes/db-load-surveys'
import { LoadSurveysController } from './../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorator/log-controller-decorator-factory'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}