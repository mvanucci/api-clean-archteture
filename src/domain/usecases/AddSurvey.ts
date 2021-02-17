import { SurveyModel } from '@/domain'

export type AddSurveyParams = Omit<SurveyModel,'id'>
export interface AddSurvey {
  add: (account: AddSurveyParams) => Promise<void>
}
