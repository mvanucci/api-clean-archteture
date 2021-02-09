import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel, SaveSurveyResult } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultData = await this.saveSurveyResultRepository.save(data)
    return surveyResultData
  }
}
