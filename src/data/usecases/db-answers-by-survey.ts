import { LoadAnswersBySurveyRepository } from '@/data'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurveyRepository {
  constructor (
    private readonly loadSurveyByIdRepositoryStub: LoadAnswersBySurveyRepository
  ) { }

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    return await this.loadSurveyByIdRepositoryStub.loadAnswers(id)
  }
}
