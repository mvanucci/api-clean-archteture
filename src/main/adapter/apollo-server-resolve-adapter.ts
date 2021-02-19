import { makeLoginController } from '@/main/factories/controllers'
import { Controller } from '@/presentation/protocols'

export const adaptResolver = async (controller: Controller, args: any): Promise<any> => {
  const loginController = makeLoginController()
  const httpResponse = await loginController.handle(args)
  return httpResponse.body
}
