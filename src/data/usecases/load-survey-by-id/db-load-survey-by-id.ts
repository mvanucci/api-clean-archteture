import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository '
import { SurveyModel } from '@/domain/models/SurveyModel'
import { LoadSurveyById } from '@/domain/usecases/LoadSurveysById'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  ) { }

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepositoryStub.loadById(id)
    return survey
  }
}
