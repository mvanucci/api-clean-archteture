import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { forbidden, serverError } from '@/presentation/helpers/http/HttpHelpers'
import { HttpRequest, LoadSurveyById } from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { SurveyModel } from '@/domain/models/SurveyModel'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyResultById: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyResultById = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyResultById)

  return {
    sut,
    loadSurveyResultById
  }
}

describe('SaveSurveyResult Controller', () => {
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyResultById } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyResultById, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('should returns 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyResultById } = makeSut()
    jest.spyOn(loadSurveyResultById, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should returns 500 if AddSurvey throws', async () => {
    const { sut, loadSurveyResultById } = makeSut()
    jest.spyOn(loadSurveyResultById, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
