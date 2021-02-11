import { SurveyResultModel } from '@/domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
