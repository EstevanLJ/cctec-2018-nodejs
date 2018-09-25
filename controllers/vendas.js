module.exports = (app, db) => {

    app.get('/vendas', (req, res) => {
        db.all('SELECT * FROM venda', (err, rows) => {
            if (err) {
                res.status(500).send()
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    vendas: rows
                }))
            }
        })
    })

    app.get('/vendas/:id', (req, res) => {
        let id = req.params.id
        let stmt = db.prepare('SELECT * FROM venda WHERE id = :id')

        stmt.all(id, (err, venda) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if(venda.length > 0) {
                    let stmtProdutos = db.prepare(`
                        SELECT * FROM venda_produto 
                        JOIN produto ON venda_produto.id = produto.id 
                        WHERE venda_id = :id`)
                    stmtProdutos.all(id, (err, produtos) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send()
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify({
                                venda,
                                produtos,
                            }))
                        }
                    })
                } else {
                    res.status(404).send()
                }
            }
        })
    })

    app.post('/vendas', (req, res) => {
        let cliente = req.body.nome_cliente
        let produtos;
        
        try {
            produtos = JSON.parse(req.body.produtos)
        } catch (error) {
            console.log(error)
            return res.status(400).send()
        }

        console.log(produtos)

        let stmtVenda = db.prepare('INSERT INTO venda (nome_cliente) VALUES (?)')

        stmtVenda.run(cliente, function (err) {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                let venda_id = this.lastID

                db.parallelize(function() {
                    produtos.forEach(produto => {
                        let stmtProduto = db.prepare('INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (?, ?, ?, ?)')
                        stmtProduto.run(venda_id, produto.produto_id, produto.quantidade, produto.valor_unitario)
                    });
                });

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    venda_id,
                }))
            }
        })
    })

}