import { Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult } from './loud-survey-result-controller-protocols'
import { forbidden, serverError, Ok } from '@/presentation/helpers/http/HttpHelpers'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, httpRequest.accountId)
      return Ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
