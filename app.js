import { config } from 'dotenv'
config()

import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { extractUser } from './middleware/extractUser.js'
import { handleErrors } from './middleware/handleErrors.js'
import { notFound } from './middleware/notFound.js'

import account from './routes/account.routes.js'
import routes from './routes/index.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, './client/build')));

app.use('/api/account', account)
app.use(extractUser)
app.use(routes)

app.use(notFound)
app.use(handleErrors)

export default app
