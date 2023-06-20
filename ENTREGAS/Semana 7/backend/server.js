const express = require('express'); 
const bodyParser = require('body-parser');
const { isBuffer } = require('util');
const { throws } = require('assert');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const sqlite3 = require('sqlite3').verbose();
const DBPATH   = 'curriculo7.db';

const hostname = '127.0.0.1';
const port  = 3000;
const app = express();

app.use(express.static("../frontend/"));


app.use(express.json());


app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    let db = new sqlite3.Database(DBPATH); //abertura do banco de dados
    let sql = 'SELECT * FROM usuario';
    db.all(sql , [], (err , rows) => {
        if(err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
})


app.post('/userinsert' , urlencodedParser , (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "INSERT INTO usuario (nome_completo , email , telefone) VALUES ('" + req.body.nome_completo + "' , '" + req.body.email + "' , '" + req.body.telefone + "')";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); //abre o banco
    db.run (sql , [], err => {
        if(err) {
            throw err;
        }       
    });
    db.close();
});

app.post('/userupdate' ,urlencodedParser ,(req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Controll-Allow-Origin' , '*');

    sql = "UPDATE usuario SET nome_completo = '" + req.body.nome_completo + "' WHERE userId = " + req.body.userId
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [], err => {
        if(err) {
            throw err;
        }
        res.end();
    });
    db.close();
})



app.post('/userdelete' ,urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "DELETE FROM usuario WHERE userId = " + req.body.userId;
    var db = new sqlite3.Database(DBPATH); //abre o banco
    
    db.run(sql, [], err => {
        if(err) {
            throw err;

        }
        res.end();
    });
    db.close();
});

/*-------------------- FORMAÇÃO  ---------------------------------*/

app.get('/formacoes', (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    let db = new sqlite3.Database(DBPATH); //abrindo banco de dados da tabela formação
    let sql = 'SELECT * FROM formacao'
    
    db.all(sql, [], (err, rows) => {
        if(err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});


app.post('inserirFormacao', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "INSERT INTO formacao (instituicao , curso , data_inicio , data_fim ) VALUES ('"+ req.body.instituicao +"', '" + req.body.curso + "' , '" + req.body.data_inicio +"', '" + req.body.data_fim +"')";
    console.log(sql);
    
    var db = new sqlite3.Database(DBPATH); //abre o banco 

    db.run (sql , [], err => {
        if(err) {
            throw err;
        }
    });
    db.close();
});


app.post('/atualizaFormacao', urlencodedParser , (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "UPDATE formacao SET instituicao , curso , data_inicio , data_fim = '" + req.body.instituicao + "' , '" + req.body.curso + "' , '" + req.body.data_inicio + "', '" + req.body.data_fim + "' WHERE id_formacao = "  + req.body.id_formacao
    var db = new sqlite3.Database(DBPATH);

    db.run(sql, [], err => {
        if(err) {
            throw err;
        }
        res.end();
    });
    db.close();
});

app.post('/deletaFormacao', urlencodedParser, (req, res) => {
    res.statusCode= 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "DELETE FROM formacao WHERE id_formacao = " + req.body.id_formacao;
    var db = new sqlite3.Database(DBPATH); // abre o banco 

    db.run(sql, [], err => {
        if(err) {
            throw err;

        }
        res.end()
    });
    db.close()

})

/*------------------------    EXPERIENCIAS      --------------------------*/

app.get('/experiencias' , (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    let db = new sqlite3.Database(DBPATH); //abrindo banco de dados
    let sql = 'SELECT * FROM experiencia'
    
    db.all( sql , [], (err , rows) => {
        if(err) {
            throw err;
        }
        res.json(rows);
    })
    db.close();
});

app.post('/insereExperiencia', urlencodedParser , (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "INSERT INTO experiencia (nome_empresa , cargo , data_inicio , data_fim) VALUES ('" +req.body.nome_empresa + "', '" + req.body.cargo + "', '" + req.body.data_inicio +"' , '" + req.body.data_fim + "')";
    console.log(sql);

    var db = new sqlite3.Database(DBPATH);

    db.run (sql , [], err => {
        if(err) {
            throw err;
        }
    });
    db.close();
});

app.post('/altualizaExperiencia', urlencodedParser , (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "UPDATE experiencia SET nome_empresa , cargo , data_inicio , data_fim = '" + req.body.nome_empresa +"' , '" + req.body.cargo +"' , '" + req.body.data_inicio +"' , '" + req.body.data_inicio +"' WHERE id_experiencia = " + req.body.id_experiencia

    var db = new sqlite3.Database(DBPATH);

    db.run(sql , [], err => {
        if(err) {
            throw err;
        }
        res.end();
    });
    db.close();

});


app.post('/deletaExperiencia',urlencodedParser , (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM experiencia WHERE id_experiencia = " + req.body.id_experiencia;
    var db = new sqlite3.Database(DBPATH);

    db.run(sql , [], err => {  
        if(err) {
            throw err;
        }
        res.end();
    })
    db.close();

});



/*------------------------    REALIZAÇOES       --------------------------*/

app.get('/realizacoes' , (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    db = new sqlite3.Database(DBPATH); //abrindo banco de dados
    sql = 'SELECT * FROM realizacoes'
    
    db.all( sql , [], (err , rows) => {
        if(err) {
            throw err;
        }
        res.json(rows);
    })
    db.close();
});



app.post('/insereRealizacao', urlencodedParser , (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*');

    sql = "INSERT INTO realizacao (certificados , habilidades) VALUES ('" +req.body.certificados + "', '" + req.body.habilidades + "')";
    console.log(sql);

    var db = new sqlite3.Database(DBPATH);

    db.run (sql , [], err => {
        if(err) {
            throw err;
        }
    });
    db.close();
});

app.post('/altualizaRealizacao', urlencodedParser , (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin' , '*'); 

    sql = "UPDATE realizacao SET certificados , habilidades = '" + req.body.certificados +"' , '" + req.body.habilidades +"' WHERE id_realizacao = " + req.body.id_realizacao

    db = new sqlite3.Database(DBPATH);

    db.run(sql , [], err => {
        if(err) {   
            throw err;
        }
        res.end();
    });
    db.close();

});

app.post('/deletaRealizacao',urlencodedParser , (req , res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = "DELETE FROM realizacao WHERE id_realizacao = " + req.body.id_realizacao;
    var db = new sqlite3.Database(DBPATH);

    db.run(sql , [], err => {
        if(err) {
            throw err;
        }   
        res.end();
    })  
    db.close();
});

// ABRINDO SERVIDOR

app.listen(port, hostname, () => {
console.log(`Page server running at: http://${hostname}:${port}/`);
});