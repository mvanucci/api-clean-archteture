import { CheckSurveyByIdRepository } from '@/data'
import { CheckSurveyById } from '@/domain'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (
    private readonly checkSurveyByIdRepositoryStub: CheckSurveyByIdRepository
  ) { }

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return await this.checkSurveyByIdRepositoryStub.checkById(id)
  }
}
