import { SurveyResultModel } from '@/domain/models/SurveyResult'

export type SaveSurveyResultParams = {
  surveyId: string
  accountId: string
  answer: string
  data: Date
}
export interface SaveSurveyResult {
  save: (account: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
