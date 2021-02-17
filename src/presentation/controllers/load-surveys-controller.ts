import { noContent, Ok, serverError } from '@/presentation/helpers/HttpHelpers'
import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId)
      return surveys.length ? Ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
