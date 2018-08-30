const express = require('express')
const app = express.Router()
const Admin = require('../controllers/admin')
const urlEncoded = express.urlencoded({extended: false})

app.get('/addmovie', Admin.addMovieShow)
app.post('/addMovie', urlEncoded, Admin.addMovie)

module.exports = app