import { SurveyModel } from '../models/SurveyModel'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
