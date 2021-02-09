import { AddSurveyParams } from '@/domain/usecases/AddSurvey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyParams) => Promise<void>
}
