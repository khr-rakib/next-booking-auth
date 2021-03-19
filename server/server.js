import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fs from 'fs'

const morgan = require('morgan') 
require('dotenv').config()

// app
const app = express()

// db
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('db connected'))
    .catch(err => console.log('db connection error', err)) 

// middlewares
app.use(cors())
app.use(morgan('dev'))

// routes middleware
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`))