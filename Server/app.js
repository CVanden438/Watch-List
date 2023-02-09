const mongoose = require('mongoose')
const authenticateUser = require('./middleware/authentication')
const authRouter = require('./routes/auth')
const reviewsRouter = require('./routes/reviews')
const taskRouter = require('./routes/tasks')
const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/reviews', authenticateUser, reviewsRouter)
app.use('/api/v1/tasks', authenticateUser, taskRouter)
app.use(errorHandlerMiddleware)
//only gets here if not returned yet aka didnt go through any of the routes
app.use(notFoundMiddleware)
const port = 5000
const url =
  'mongodb+srv://Chris:1234@cluster0.fnsbaaj.mongodb.net/?retryWrites=true&w=majority'
const connectDB = (url) => {
  return mongoose.connect(url)
}

const start = async () => {
  try {
    await connectDB(url)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
