import { adaptResolver } from '@/main/adapter/apollo-server-resolve-adapter'
import { makeLoadSurveyController } from '@/main/factories'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveyController(), args, context)
  }
}
