import express from 'express'
import setupMiddlewares from './middleware'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import setupStaticFiles from './static-files'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
