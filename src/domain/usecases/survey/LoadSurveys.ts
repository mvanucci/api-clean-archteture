import { SurveyModel } from '@/domain/models/SurveyModel'

export interface LoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}
