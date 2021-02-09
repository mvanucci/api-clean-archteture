import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/SaveSurveyResult'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/SurveyResult'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    },
    {
      $set: {
        answer: data.answer,
        date: data.date
      }
    },
    {
      upsert: true,
      returnOriginal: false
    })
    return res.value && MongoHelper.map(res.value)
  }
}
