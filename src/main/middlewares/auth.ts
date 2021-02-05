import { makeAuthMiddleware } from '@/main/factories/middleware/auth-middleware-factory'
import { adaptMiddleware } from '@/main/adapter/express-middleware-route-adapter'

export const auth = adaptMiddleware(makeAuthMiddleware())
