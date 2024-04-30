const express = require('express')

const app = express()
const cors = require('cors')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config({path: "../.env"})
const errorHandler = require('./Middleware/error')


const mongo = process.env.CONNECTION_STRING
const port = process.env.PORT || 4242

app.use(cors())
app.options('*', cors)
app.use(express.json()) 
app.use(errorHandler)

//routes
const authRouter = require('./Routes/auth')
//connect routes

app.use("/api/auth", authRouter)

app.get( "/", (req, res) => {
  res.send('hello')
})


mongoose.connect(mongo)
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))


app.listen(port, () => console.log(`connected to port ${port}`)) 