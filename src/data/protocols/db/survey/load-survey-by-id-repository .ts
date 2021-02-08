import { SurveyModel } from '../../../../domain/models/SurveyModel'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
