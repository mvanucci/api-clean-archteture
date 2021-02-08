import { SurveyResultModel } from '../models/SurveyResult'

export type SaveSurveyResultModel = Omit<SurveyResultModel,'id'>
export interface SaveSurveyResult {
  save: (account: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
