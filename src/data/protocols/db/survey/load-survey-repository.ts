import { SurveyModel } from './../../../../domain/models/SurveyModel'

export interface LoadSurveyRepository {
  loadAll: () => Promise<SurveyModel[]>
}
