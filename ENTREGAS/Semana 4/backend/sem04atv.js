const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH =  '../data/curriculo4.db';


app.use(express.json());

app.use(express.json());

app.get('/usuario', (req, res) => {
    const db = new sqlite3.Database(DBPATH);
    const sql = 'SELECT * FROM usuario';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(rows);
        db.close();
    });
});

app.get('/formacao', (req, res) => {
    const db = new sqlite3.Database(DBPATH);
    const sql = 'SELECT * FROM formacao';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(rows);
        db.close();
    });
});

app.get('/experiencia', (req, res) => {
    const db = new sqlite3.Database(DBPATH);
    const sql = 'SELECT * FROM experiencia';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(rows);
        db.close();
    });
});

app.get('/realizacoes', (req, res) => {
    const db = new sqlite3.Database(DBPATH);
    const sql = 'SELECT * FROM realizacoes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(rows);
        db.close();
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});