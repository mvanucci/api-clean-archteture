import { SurveyResultModel } from '@/domain'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
