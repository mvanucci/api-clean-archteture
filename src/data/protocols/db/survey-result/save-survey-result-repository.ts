import { SaveSurveyResultParams } from '@/domain'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
