import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { forbidden, Ok, serverError } from '@/presentation/helpers/HttpHelpers'
import { LoadSurveyById, SaveSurveyResult } from '@/domain'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyResultById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) { }

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId, answer } = request
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
