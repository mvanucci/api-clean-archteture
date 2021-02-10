import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyParams) => Promise<void>
}
