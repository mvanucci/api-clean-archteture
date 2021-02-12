import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { forbidden, Ok, serverError } from '@/presentation/helpers/http/HttpHelpers'
import { HttpResponse, Controller, HttpRequest, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyResultById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest
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

      const surveyRestul = await this.saveSurveyResult.save({
        accountId: accountId,
        surveyId: surveyId,
        answer,
        data: new Date()
      })
      return Ok(surveyRestul)
    } catch (error) {
      return serverError(error)
    }
  }
}
