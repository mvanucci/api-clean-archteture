import { noContent } from './../../../helpers/http/HttpHelpers'
import { Ok, serverError } from '../../../helpers/http/HttpHelpers'
import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? Ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
