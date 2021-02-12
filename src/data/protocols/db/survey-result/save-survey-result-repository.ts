import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
