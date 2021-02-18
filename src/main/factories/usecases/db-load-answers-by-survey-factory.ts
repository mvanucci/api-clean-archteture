import { LoadAnswersBySurvey } from '@/domain'
import { DbLoadAnswersBySurvey } from '@/data'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
