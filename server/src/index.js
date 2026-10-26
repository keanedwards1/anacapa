import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import catalogRouter, { starterCategories } from './routes/catalog.js'
import { Category } from './models/Category.js'

const app = express()
const port = Number(process.env.PORT || 4000)
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not-configured',
  })
})
app.use('/api/catalog', catalogRouter)

app.use((error, _request, response, _next) => {
  console.error(error.message)
  response.status(500).json({ error: 'The request could not be completed.' })
})

async function start() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI)
    await Promise.all(starterCategories.map((category) =>
      Category.updateOne({ slug: category.slug }, { $setOnInsert: category }, { upsert: true }),
    ))
    console.log('Connected to MongoDB Atlas.')
  } else {
    console.log('MONGODB_URI is not set; using the starter catalog.')
  }

  app.listen(port, '0.0.0.0', () => console.log(`Anacapa API listening on ${port}.`))
}

start().catch((error) => {
  console.error(`Unable to start the API: ${error.message}`)
  process.exit(1)
})
