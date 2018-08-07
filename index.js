const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const db = new sqlite3.Database('database.sqlite')
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produtos', (req, res) => {

  let codigo = req.query.codigo
  let nome = req.query.nome

  let stmt = db.prepare('INSERT INTO produto (codigo, nome) VALUES (?, ?)')
  
  stmt.run(codigo, nome, (err) => {
    if(err) {
      res.status(400).send('num foi')
    } else {
      res.send('foi')
    }
  })

})

app.get('/prods', (req, res) => {

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