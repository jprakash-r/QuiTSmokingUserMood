const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

// Create Express App
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// Routes
app.use('/', routes)

//connect to DB
mongoose.connect(process.env.url,
    {
      useNewUrlParser: true, useUnifiedTopology: true
    // eslint-disable-next-line promise/always-return
    }).then(() => {
      console.log("Connected to db")
    }).catch((error) => {
      console.log("Error: " + error)
    })

module.exports = app
