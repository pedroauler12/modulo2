const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// definir diretorio onde os arquivos estatiscos estao servidos

app.use(express.static('./public'))

//definir diretorio raiz

app.get('/' , (req,res) => {
    res.send('servidor express em execução');
});

app.listen(3000, () => {
    console.log(`Servidor iniciado ${hostname}:${port}`);
});