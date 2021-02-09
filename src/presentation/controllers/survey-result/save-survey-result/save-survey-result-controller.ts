import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { forbidden, serverError } from '@/presentation/helpers/http/HttpHelpers'
import { HttpResponse, Controller, HttpRequest, LoadSurveyById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyResultById: LoadSurveyById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveyResultById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
