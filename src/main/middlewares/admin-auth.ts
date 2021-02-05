import { adaptMiddleware } from '@/main/adapter/express-middleware-route-adapter'
import { makeAuthMiddleware } from '@/main/factories/middleware/auth-middleware-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
