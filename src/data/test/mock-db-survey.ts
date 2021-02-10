import { SaveSurveyResultRepository } from './../protocols/db/survey-result/save-survey-result-repository'
import { SurveyModel } from '@/domain/models/SurveyModel'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository '
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test/mock-survey'
import { LoadSurveyRepository } from '../protocols/db/survey/load-survey-repository'
import { SurveyResultModel } from '@/domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/SaveSurveyResult'
import { mockSurveyModelRestult } from '@/domain/test'

export const mockAddDbSurveyReposity = (): AddSurveyRepository => {
  class AddDbSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddDbSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveyRepository = (): LoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveyModels()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

export const mockDbSurveyResultRepository = (): SaveSurveyResultRepository => {
  class DaveDbSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyModelRestult()))
    }
  }
  return new DaveDbSurveyResultRepositoryStub()
}
