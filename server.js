// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração do servidor
const app = express();
const port = 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',  // Altere para seu host MySQL, se necessário
    user: 'root',       // Usuário MySQL
    password: '',       // Senha MySQL (padrão é vazio no XAMPP ou similar)
    database: 'playbonds'  // Nome do banco de dados que criamos
});

// Verificar conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Configurar middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Para servir arquivos estáticos (como o front-end)

// Rota para salvar o feedback
app.post('/feedback', (req, res) => {
    const { usuario, area, nivel, feedback } = req.body;

    const query = 'INSERT INTO feedbacks (usuario, area, nivel, feedback) VALUES (?, ?, ?, ?)';
    db.query(query, [usuario, area, nivel, feedback], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao salvar feedback', error: err });
        }
        res.status(201).json({ message: 'Feedback salvo com sucesso!' });
    });
});

// Rota para obter todos os feedbacks
app.get('/feedbacks', (req, res) => {
    const query = 'SELECT * FROM feedbacks ORDER BY data DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao obter feedbacks', error: err });
        }
        res.status(200).json(results);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});