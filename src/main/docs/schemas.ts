import {
  loginParamsSchema,
  errorSchema,
  accountSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  signupParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  addSurveySchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  signupParams: signupParamsSchema,
  addSurveyParams: addSurveySchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema
}
