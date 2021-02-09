import { AddSurveyModel } from '@/domain/usecases/AddSurvey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
