require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const authRouter = require('./routers/auth')
const jobsRouter = require('./routers/jobs')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware')
const notFound = require('./middlewares/notFound')

app.get('/', (req, res)=>{
    res.send('Welcome to Jobs API page')
})


app.use('/api/v1', authRouter)
app.use('/api/v1', jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = 4000 || process.env.PORT

const start = async ()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`)
    })
}

start()