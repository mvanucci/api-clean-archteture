import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultParams } from './db-save-survey-result-protocols'
import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'

const makeFakeSurveyRestult = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyRestultData = (): SurveyResultModel => Object.assign({}, {
  id: 'any_id'
}, makeFakeSurveyRestult(), {})

const makeDbSurveyResultRepository = (): SaveSurveyResultRepository => {
  class DaveDbSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyRestult()))
    }
  }

  return new DaveDbSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveDbSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveDbSurveyResultRepositoryStub = makeDbSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveDbSurveyResultRepositoryStub)

  return {
    sut,
    saveDbSurveyResultRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call SaveSurveyRepository', async () => {
    const { sut, saveDbSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveDbSurveyResultRepositoryStub, 'save')
    const surveyResultData = makeFakeSurveyRestultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if SaveSurveyRepository with throws', async () => {
    const { sut, saveDbSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveDbSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(makeFakeSurveyRestultData())
    await expect(promise).rejects.toThrow()
  })

  test('should return Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.save(makeFakeSurveyRestultData())
    expect(surveys).toEqual(makeFakeSurveyRestultData())
  })
})
