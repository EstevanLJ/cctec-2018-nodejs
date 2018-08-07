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

app.post('/produtos', (req, res) => {

  let codigo = req.body.codigo
  let nome = req.body.nome
  console.log(codigo, nome)

  let stmt = db.prepare('INSERT INTO produto (codigo, nome) VALUES (?, ?)')
  
  stmt.run(codigo, nome, (err) => {
    if(err) {
      console.log(err)
      res.status(400).send('num foi')
    } else {
      res.send('foi')
    }
  })

})

app.get('/produtos', (req, res) => {

  db.all('SELECT * FROM produto', (err, rows) => {
    if(err) {
      res.status(500).send()
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ produtos: rows }));
    }
  })

})
 
app.listen(3000, () => {
    console.log('Up on port http://localhost:3000');
})