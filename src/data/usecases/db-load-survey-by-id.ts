import { LoadSurveyById, SurveyModel } from '@/domain'
import { LoadSurveyByIdRepository } from '@/data'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  ) { }

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepositoryStub.loadById(id)
    return survey
  }
}
