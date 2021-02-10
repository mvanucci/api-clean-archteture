import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveyRepository } from './db-load-surveys-protocols'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test'
import { mockLoadSurveyRepository } from '@/data/test'
import { mockSurveyModels } from '@/domain/test/mock-survey'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveyRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
