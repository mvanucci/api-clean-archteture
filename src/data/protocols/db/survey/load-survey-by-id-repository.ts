import { SurveyModel } from '@/domain/models/SurveyModel'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<LoadSurveyByIdRepository.Result>
}

export namespace LoadSurveyByIdRepository {
  export type Result = SurveyModel
}
