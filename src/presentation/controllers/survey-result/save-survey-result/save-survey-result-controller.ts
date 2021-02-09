import { HttpResponse, Controller, HttpRequest, LoadSurveyById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyResultById: LoadSurveyById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyResultById.loadById(httpRequest.params.surveyId)
    return null
  }
}
