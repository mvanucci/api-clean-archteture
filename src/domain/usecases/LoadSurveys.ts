import { SurveyModel } from '@/domain'

export interface LoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}
