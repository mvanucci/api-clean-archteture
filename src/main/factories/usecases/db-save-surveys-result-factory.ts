import { DbSaveSurveyResult } from '@/data/usecases/db-save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository'
import { SaveSurveyResult } from '@/domain'

export const makeDbSaveSurveysResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
