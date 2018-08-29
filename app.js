const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('./views/assets'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('loginRegist')
})

app.listen(3000, () => {
  console.log('Running on port 3000.......');
})