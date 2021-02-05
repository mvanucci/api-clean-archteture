import { LogMongoRepository } from '@/infra/db/mongodb/log-repository/log'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log'

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
