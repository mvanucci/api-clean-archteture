import { SurveyModel } from '@/domain/models/SurveyModel'

export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<LoadSurveysRepository.Result>
}

export namespace LoadSurveysRepository {
  export type Result = SurveyModel[]
}
