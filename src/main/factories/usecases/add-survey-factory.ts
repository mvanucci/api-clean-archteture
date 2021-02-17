import { DbAddSurvey } from '@/data/usecases/db-add-survey'
import { AddSurvey } from '@/domain/usecases/AddSurvey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
