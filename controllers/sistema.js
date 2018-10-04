const fs = require('fs');

module.exports = (app, db) => {

    app.get('/reiniciar', (req, res) => {
        fs.copyFile('./database.sqlite.example', './database.sqlite', (err) => {
            if (err) {
                console.log(err)
                res.status(400).send()
            } else {
                res.send()
            }
        })
    })

    app.get('/download', (req, res) => {
        var file = './database.sqlite.example';
        res.download(file); 
    })

}