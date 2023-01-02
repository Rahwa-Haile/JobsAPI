require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

app.get('/', (req, res)=>{
    res.send('Welcome to Jobs API page')
})

const port = 4000 || process.env.PORT

const start = async ()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`)
    })
}

start()