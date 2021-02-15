import { SurveyModel } from '@/domain/models/SurveyModel'

export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<SurveyModel[]>
}
