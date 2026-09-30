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

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao MYSQL: ', erro);
        return;
    }

    console.log('Conectado com sucesso ao banco de dados MYSQL!')
})

app.post('/cadastrarPonto', (req, res) => {
    const { cpf } = req.body;

    conexao.query('SELECT id_trabalhador FROM trabalhadores WHERE cpf = ?',
        [cpf],
        (erro, resultado) => {
            if (erro) {
                return res.status(404).json({
                    mensagem: "Erro ao encontrar CPF."
                });
            }

            if (resultado.length === 0) {
                return res.status(500).json({
                    mensagem: "CPF não encontrado."
                });
            }

            const id_trabalhador = resultado[0].id_trabalhador

            conexao.query('INSERT INTO ponto (id_trabalhador) VALUES (?)',
                [id_trabalhador],
                (erro, resultado) => {
                    console.log("ERRO DO INSERT:", erro);
                    if (erro) {
                        return res.status(500).json({
                            mensagem: "Erro ao cadastrar ponto."
                            
                        });
                    }

                    if (resultado) {
                        return res.status(200).json({
                            mensagem: "Ponto Cadastrado com sucesso!"
                        });
                    }

                    console.log(id_trabalhador)
                    
                }
            )

        }
    );
});






app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})