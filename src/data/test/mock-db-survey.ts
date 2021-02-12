import { SurveyModel } from '@/domain/models/SurveyModel'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository '
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveyRepository } from '../protocols/db/survey/load-survey-repository'

export const mockAddDbSurveyReposity = (): AddSurveyRepository => {
  class AddDbSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddDbSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveyRepository = (): LoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysRepositoryStub()
}
