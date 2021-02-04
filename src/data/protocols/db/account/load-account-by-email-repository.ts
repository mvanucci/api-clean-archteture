import { SurveyAnswer } from '../../../../domain/models/SurveyModel'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<SurveyAnswer>
}
