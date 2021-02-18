import { SurveyResultModel } from '@/domain'

export interface SaveSurveyResult {
  save: (account: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}

export namespace SaveSurveyResult {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
  export type Result = SurveyResultModel
}
