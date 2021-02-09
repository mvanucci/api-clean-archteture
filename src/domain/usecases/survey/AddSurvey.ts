import { SurveyModel } from '@/domain/models/SurveyModel'

export type AddSurveyParams = Omit<SurveyModel,'id'>
export interface AddSurvey {
  add: (account: AddSurveyParams) => Promise<void>
}
