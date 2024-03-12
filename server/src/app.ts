import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFoundHandler from './app/middleware/notFoundHandler'
import config from './app/config'
import cookieParser from 'cookie-parser'
const app: Application = express()

//parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: config.client_url, credentials: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//application routes
app.use('/api/v1', router)

//global error handler
app.use(globalErrorHandler)

// not found route handler
app.use(notFoundHandler)

export default app
