const express = require('express')
const app = express.Router()
const Admin = require('../controllers/admin')
const urlEncoded = express.urlencoded({extended: false})

app.get('/addmovie', Admin.addMovieShow)
app.post('/addMovie', urlEncoded, Admin.addMovie)

app.get('/listMovie', Admin.showList)

app.get('/editMovie/:id', Admin.showEdit)
app.post('/editMovie/:id', urlEncoded, Admin.edit)

app.get('/deleteMovie/:id', Admin.remove)

module.exports = app