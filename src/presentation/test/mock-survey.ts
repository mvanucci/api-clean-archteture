import { AddSurveyParams, AddSurvey } from '@/domain/usecases/survey/AddSurvey'
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveysById'
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys'
import { SurveyModel } from '@/domain/models/SurveyModel'
import { mockSurveyModels, mockSurveyModel } from '@/domain/test'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  callsCount = 0

  async load (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveyModels
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}
