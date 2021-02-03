import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey UseCase', () => {
  test('should call AddSurveyRepository', async () => {
    class AddDSurveyRepositoryStub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const addDSurveyRepositoryStub = new AddDSurveyRepositoryStub()
    const addSpy = jest.spyOn(addDSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addDSurveyRepositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
