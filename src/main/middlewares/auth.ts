import { makeAuthMiddleware } from './../factories/middleware/auth-middleware-factory'
import { adaptMiddleware } from '../adapter/express-middleware-route-adapter'

export const auth = adaptMiddleware(makeAuthMiddleware())
