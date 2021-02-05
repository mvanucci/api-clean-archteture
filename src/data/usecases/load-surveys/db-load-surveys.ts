import { SurveyModel } from '../../../domain/models/SurveyModel'
import { LoadSurveys } from '../../../domain/usecases/LoadSurveys'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveyRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
