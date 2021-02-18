import { LoadSurveyByIdRepository } from '@/data'
import { LoadAnswersBySurvey } from '@/domain'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (
    private readonly loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  ) { }

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepositoryStub.loadById(id)
    return survey?.answers.map(a => a.answer) || []
  }
}
