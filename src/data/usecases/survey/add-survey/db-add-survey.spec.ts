import MockDate from 'mockdate'
import { AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import { mockAddSurveyParams, throwError } from '@/domain/test'
import { mockAddDbSurveyReposity } from '@/data/test/mock-db-survey'

type SutTypes = {
  sut: DbAddSurvey
  addDbSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addDbSurveyRepositoryStub = mockAddDbSurveyReposity()
  const sut = new DbAddSurvey(addDbSurveyRepositoryStub)

  return {
    sut,
    addDbSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call AddSurveyRepository', async () => {
    const { sut, addDbSurveyRepositoryStub } = makeSut()
    const surveyData = mockAddSurveyParams()
    const addSpy = jest.spyOn(addDbSurveyRepositoryStub, 'add')
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository with throws', async () => {
    const { sut, addDbSurveyRepositoryStub } = makeSut()
    jest.spyOn(addDbSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
