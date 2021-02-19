import { adaptResolver } from '@/main/adapter/apollo-server-resolve-adapter'
import { makeLoginController } from '@/main/factories'
export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  }
}
