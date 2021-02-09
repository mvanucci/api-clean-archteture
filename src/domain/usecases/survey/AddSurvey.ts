import { SurveyModel } from '@/domain/models/SurveyModel'

export type AddSurveyModel = Omit<SurveyModel,'id'>
export interface AddSurvey {
  add: (account: AddSurveyModel) => Promise<void>
}
