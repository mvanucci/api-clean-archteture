import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockSaveSurveyModelRestultParams, throwError } from '@/domain/test'
import { mockDbSurveyResultRepository } from '@/data/test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveDbSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveDbSurveyResultRepositoryStub = mockDbSurveyResultRepository()
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
    const surveyResultData = mockSaveSurveyModelRestultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if SaveSurveyRepository with throws', async () => {
    const { sut, saveDbSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveDbSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyModelRestultParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.save(mockSaveSurveyModelRestultParams())
    expect(surveys).toEqual(mockSaveSurveyModelRestultParams())
  })
})
