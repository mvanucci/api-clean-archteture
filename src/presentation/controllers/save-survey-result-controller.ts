import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { forbidden, Ok, serverError } from '@/presentation/helpers/HttpHelpers'
import { LoadAnswersBySurvey, SaveSurveyResult } from '@/domain'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult
  ) { }

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId, answer } = request
      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)
      if (!answers.length) {
        return forbidden(new InvalidParamError('surveyId'))
      } else if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      const surveyRestul = await this.saveSurveyResult.save({
        accountId: accountId,
        surveyId: surveyId,
        answer,
        date: new Date()
      })
      return Ok(surveyRestul)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
