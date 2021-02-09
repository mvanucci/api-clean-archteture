import { SurveyResultModel } from '@/domain/models/SurveyResult'

export type SaveSurveyResultParams = Omit<SurveyResultModel,'id'>
export interface SaveSurveyResult {
  save: (account: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
