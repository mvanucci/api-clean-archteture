import MockDate from 'mockdate'
import { AddSurveyParams, AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeAddDbSurveyReposity = (): AddSurveyRepository => {
  class AddDbSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddDbSurveyRepositoryStub()
}

type SutTypes = {
  sut: DbAddSurvey
  addDbSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addDbSurveyRepositoryStub = makeAddDbSurveyReposity()
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
    const surveyData = makeFakeSurveyData()
    const addSpy = jest.spyOn(addDbSurveyRepositoryStub, 'add')
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository with throws', async () => {
    const { sut, addDbSurveyRepositoryStub } = makeSut()
    jest.spyOn(addDbSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
