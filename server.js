const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema_ponto',
    port: 3306
})

conexao.connect((erro) =>{
    if (erro) {
        console.error('Erro ao conectar ao MYSQL: ', erro);
        return;
    }

    console.log('Conectado com sucesso ao banco de dados MYSQL!')
})

app.post('/cadastrarPonto', (res, res) =>{
    const {cpf} 
} )


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})