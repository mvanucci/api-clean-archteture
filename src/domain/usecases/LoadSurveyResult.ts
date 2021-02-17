import { SurveyResultModel } from '@/domain'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
