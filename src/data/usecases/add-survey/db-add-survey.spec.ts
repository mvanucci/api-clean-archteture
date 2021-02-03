import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddDbSurveyReposity = (): AddSurveyRepository => {
  class AddDbSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddDbSurveyRepositoryStub()
}

interface SutTypes {
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
  test('should call AddSurveyRepository', async () => {
    const { sut, addDbSurveyRepositoryStub } = makeSut()
    const surveyData = makeFakeSurveyData()
    const addSpy = jest.spyOn(addDbSurveyRepositoryStub, 'add')
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
