
import { DbLoadSurveyById } from '@/data/usecases/db-load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveysById'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
