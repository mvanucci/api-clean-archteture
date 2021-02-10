import { SurveyResultModel } from '@/domain/models/SurveyResult'

export const mockSurveyModelRestult = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSaveSurveyModelRestultParams = (): SurveyResultModel => Object.assign({}, {
  id: 'any_id'
}, mockSurveyModelRestult(), {})
