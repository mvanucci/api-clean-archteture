import { SurveyModel } from '../../../domain/models/SurveyModel'
import { LoadSurveyRepository } from './../../protocols/db/survey/load-survey-repository'

export class DbLoadSurveys implements LoadSurveyRepository {
  constructor (
    private readonly loadSurveysRepository: LoadSurveyRepository
  ) {}

  LoadSurveyRepository

  async loadAll (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return []
  }
}
