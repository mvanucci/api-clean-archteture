import { SurveyModel } from '@/domain/models/SurveyModel'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
