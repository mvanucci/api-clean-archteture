import { SurveyModel } from '@/domain'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
