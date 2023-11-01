import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from '../middleware/error.middleware.js'
import todoRouter from '../routes/todos.js'
import uploadRouter from '../routes/uploads.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/storage', express.static('storage'))

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})
app.use('/api/todos', todoRouter)
app.use('/api/todos', uploadRouter)

app.use(errorMiddleware)

export default app
