const express = require('express')
const app = express()
var session = require('express-session')

const routeUser = require('./routes/user')
const routeAdmin = require('./routes/admin')

const port = process.env.port || '3000'

app.set('view engine', 'ejs')

app.use(express.static('./views'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  next();
});

app.use('/user', routeUser)
app.use('/admin', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/user/login')
  } else if(req.session.user.role === 'admin') {
    next()
  } else {
    res.redirect('/user/login')
  }
},routeAdmin)

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Running on port ${port}.......`);
})