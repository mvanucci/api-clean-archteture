import { adaptResolver } from '@/main/adapter/apollo-server-resolve-adapter'
import { makeLoadSurveyController } from '@/main/factories'

export default {
  Query: {
    surveys: async (args: any) => adaptResolver(makeLoadSurveyController(), args)
  }
}
