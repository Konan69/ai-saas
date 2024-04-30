const express = require('express')

const app = express()
const cors = require('cors')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config({path: "../.env"})

const mongo = process.env.CONNECTION_STRING

app.use(cors())
app.options('*', cors)
app.use(express.json()) 
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.PORT || 4242

mongoose.connect(mongo)
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))


app.listen(port, () => console.log(`connected to port ${port}`))