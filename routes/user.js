const express = require('express')
const app = express.Router()
const User = require('../controllers/user')
const urlEncoded = express.urlencoded({extended: false})

app.get('/login', User.loginShow)
app.post('/login', urlEncoded, User.login)

app.get('/register', User.registShow)
app.post('/register', urlEncoded, User.register)

app.get('/logout', User.logout)

app.get('/movies', User.movies)

app.get('/bookSeat/:idStudio/:idJadwal', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/user/login')
  } else if(req.session.user && req.session.user.role === 'client') {
    next()
  } else {
    res.redirect('/user/login')
  }
}, User.bookSeatShow)

app.get('/tickets/:id', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/user/login')
  } else if(req.session.user && req.session.user.role === 'client') {
    next()
  } else {
    res.redirect('/user/login')
  }
}, User.showTickets)

app.post('/bookSeat/:idStudio/:idJadwal/:idSchedule', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/user/login')
  } else if(req.session.user && req.session.user.role === 'client') {
    next()
  } else {
    res.redirect('/user/login')
  }
}, urlEncoded, User.bookSeat)


module.exports = app