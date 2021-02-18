import { DbCheckSurveyById } from '@/data'
import { CheckSurveyByIdRepositorySpy } from '@/tests/data/mock'
import { throwError } from '@/tests/domain/mock'
import faker from 'faker'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbLoadSurveyById', () => {
  beforeEach(() => {
    surveyId = faker.random.uuid()
  })

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById(surveyId)
    expect(checkSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('Should return true if checkSurveyById returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(surveyId)
    expect(exists).toBeTruthy()
  })

  test('Should return false if checkSurveyById returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    checkSurveyByIdRepositorySpy.result = false
    const exists = await sut.checkById(surveyId)
    expect(exists).toBeFalsy()
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
