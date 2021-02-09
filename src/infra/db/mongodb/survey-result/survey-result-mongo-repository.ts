import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper'
import { SaveSurveyResultModel } from '@/domain/usecases/SaveSurveyResult'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/SurveyResult'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
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
