
import { AddSurveyController } from '@/presentation/controllers/add-survey-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
