import { SurveyModel } from './../../../../domain/models/SurveyModel'
import { LoadSurveyRepository } from './../../../../data/protocols/db/survey/load-survey-repository'
import { MongoHelper } from './../helpers/mongodb-helper'
import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyCollection.find().toArray()
    return surveys
  }
}
