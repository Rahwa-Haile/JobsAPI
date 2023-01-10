require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const authRouter = require('./routers/auth')
const jobsRouter = require('./routers/jobs')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware')
const notFoundMiddleware = require('./middlewares/notFound')
const authenticateUser = require('./middlewares/authentication')


app.use(express.json())

app.use('/api/v4/auth', authRouter)
app.use('/api/v4/jobs', authenticateUser, jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = 4000 || process.env.PORT

const start = async ()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`)
    })
}

start()