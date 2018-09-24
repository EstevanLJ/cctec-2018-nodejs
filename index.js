require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const sqlite3 = require('sqlite3')
const bodyParser = require('body-parser')

const app = express()
const db = new sqlite3.Database('database.sqlite')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('./controllers/produtos')(app, db)
require('./controllers/vendas')(app, db)
require('./controllers/sistema')(app)
 
app.listen(PORT, () => {
    console.log('Up on port ' + PORT);
})