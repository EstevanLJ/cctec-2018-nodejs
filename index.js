require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const sqlite3 = require('sqlite3')
const bodyParser = require('body-parser')

const app = express()
const db = new sqlite3.Database('database.sqlite')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Habilita o CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('./controllers/produtos')(app, db)
require('./controllers/vendas')(app, db)
require('./controllers/sistema')(app)
 
app.listen(PORT, () => {
    console.log('Up on port ' + PORT);
})