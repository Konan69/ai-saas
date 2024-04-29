const express = require('express')

const app = express()
const cors = require('cors')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config({path: "./ AI-SAAS/.env"})

app.use(cors())
app.options('*', cors)
app.use(express.json()) 
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.PORT || 4242
console.log(port)

app.listen(port, () => console.log(`connected to port ${port}`))