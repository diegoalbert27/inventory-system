import { config } from 'dotenv'
config()

import express from 'express'
import morgan from 'morgan'
import { extractUser } from './middleware/extractUser.js'
import { handleErrors } from './middleware/handleErrors.js'
import { notFound } from './middleware/notFound.js'
import routes from './routes/index.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(extractUser)
app.use(routes)

app.use(notFound)
app.use(handleErrors)

export default app
