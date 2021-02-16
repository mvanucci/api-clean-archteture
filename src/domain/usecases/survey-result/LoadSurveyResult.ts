import { SurveyResultModel } from '@/domain/models/SurveyResult'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
