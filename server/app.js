const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rest-shop',{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
mongoose.Promise = global.Promise
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(express.static('uploads'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/auth', require('./routes/users'))

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app
