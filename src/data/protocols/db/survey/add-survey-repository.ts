import { AddSurvey } from '@/domain'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyRepository.Params) => Promise<void>
}
export namespace AddSurveyRepository {
  export type Params = AddSurvey.Params
}
