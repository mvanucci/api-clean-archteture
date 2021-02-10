import { LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { throwError } from '@/domain/test'
import { mockLoadSurveyByIdRepositoryStub } from '@/data/test'
import { mockSurveyModel } from '@/domain/test/mock-survey'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
