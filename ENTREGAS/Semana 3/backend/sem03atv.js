const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/curriculo.db';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/formacoes', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM formacao ORDER BY id_formacao COLLATE NOCASE';
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereFormacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO formacao (id_formacao, userId, instituicao , curso , data_inicio , data_fim) VALUES ('" + req.body.id_formacao + "', '" + req.body.userId + "', '" + req.body.instituicao + "', '" + req.body.curso + "' , '" + req.body.data_inicio + "', '" + req.body.data_fim + "')";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }	
    });
    res.write('<p>DADOS INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaFormacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "SELECT * FROM formacao WHERE id_formacao="+ req.query.id_formacao;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaFormacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "UPDATE formacao SET id_formacao='" + req.body.id_formacao  + "' , instituicao='" + req.body.instituicao + "', curso '" + req.body.curso + "' , data_inicio '" + req.body.data_inicio + "' , data_fim'" + req.body.data_fim + "' WHERE userId='" + req.body.userId + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {z
        if (err) {
            throw err;
        }
        res.end();
    });
    res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeFormacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "DELETE FROM formacao WHERE id_formacao ='" + req.query.id_formacao + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.write('<p>DADOS REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
console.log(`Servidor rodando em http://${hostname}:${port}/`);
});