module.exports = (app, db) => {

    app.post('/produtos', (req, res) => {
        let codigo = req.body.codigo
        let nome = req.body.nome
        let stmt = db.prepare('INSERT INTO produto (codigo, nome) VALUES (?, ?)')

        stmt.run(codigo, nome, (err) => {
            if (err) {
                console.log(err)
                res.status(400).send()
            } else {
                res.send()
            }
        })
    })

    app.get('/produtos', (req, res) => {
        db.all('SELECT * FROM produto', (err, rows) => {
            if (err) {
                res.status(500).send()
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    produtos: rows
                }));
            }
        })
    })

    app.put('/produtos/:id', (req, res) => {
        let id = req.params.id
        let codigo = req.body.codigo
        let nome = req.body.nome

        let stmt = db.prepare('UPDATE produto SET codigo = :codigo, nome = :nome WHERE id = :id')

        stmt.run(codigo, nome, id, (err) => {
            if (err) {
                console.log(err)
                res.status(400).send()
            } else {
                res.send()
            }
        })
    })

}