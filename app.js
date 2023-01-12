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
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(express.json())


app.use(helmet())
app.use(cors())
app.use(xss())


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