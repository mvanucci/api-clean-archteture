import MockDate from 'mockdate'
import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { forbidden, serverError } from '@/presentation/helpers/http/HttpHelpers'
import { HttpRequest, LoadSurveyById, SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel } from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { SurveyModel } from '@/domain/models/SurveyModel'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
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

const makeFakeSurveyRestul = (): SurveyResultModel => ({
  id: 'valid_id',
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  date: new Date(),
  answer: 'any_answer'
})

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (account: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyRestul()))
    }
  }
  return new SaveSurveyResultStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyResultById: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyResultById = makeLoadSurveyById()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadSurveyResultById, saveSurveyResultStub)

  return {
    sut,
    loadSurveyResultById,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

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

  test('should returns 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      {
        params: {
          surveyId: 'any_survey_id'
        },
        body: {
          answer: 'wrong_answer'
        }
      }
    )
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should call SaveSurveyRestult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    })
  })
})
