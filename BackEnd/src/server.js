const express = require('express')
const cors = require("cors")
const connection = require('./connection');
const getCliente = require('./cliente');
const getVendedor = require('./vendedor');
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json());
app.use(cors());
const PORT = 3003

const pool = connection;

app.post('/Login', async (req, res) => {
    const { CLI_EMAIL, CLI_SENHA } = req.body;
  
    // Verifique se o e-mail e a senha correspondem a um cliente existente no banco de dados
    const [result] = await pool.query(
      'SELECT * FROM CLI_CLIENTE WHERE CLI_EMAIL = ? AND CLI_SENHA = ?',
      [CLI_EMAIL, CLI_SENHA]
    );
  
    if (result.length > 0) {
      // Credenciais válidas, você pode gerar um token de autenticação aqui
      const token = jwt.sign({ userId: result.insertId, userType: 'cliente' }, 'secreto', { expiresIn: '24h' });
      console.log(result);
      res.status(200).json({message: "Usuario reconhecido", token});
    } else {
      // Credenciais inválidas
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });

app.get('/Cliente', async(req, res) => {
    const query = await getCliente();
    return res.status(200).json(query);
})

app.get('/Vendedor', async(req, res) => {
    const query = await getVendedor();
    return res.status(200).json(query);
})

app.post('/inserirVendedor', (req, res) => {
    const {VEN_NOME, VEN_EMAIL, VEN_DATA, VEN_SEXO, VEN_DOCUMENTO, VEN_ENDERECO, VEN_TELEFONE, VEN_WHATSAPP, VEN_SENHA} = req.body;
        console.log(req.body)
    let SQL = "INSERT INTO VEN_VENDENDOR(VEN_NOME, VEN_EMAIL, VEN_DATA, VEN_SEXO, VEN_DOCUMENTO, VEN_ENDERECO, VEN_TELEFONE, VEN_WHATSAPP, VEN_SENHA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    connection.query(SQL, [VEN_NOME, VEN_EMAIL, VEN_DATA, VEN_SEXO, VEN_DOCUMENTO, VEN_ENDERECO, VEN_TELEFONE, VEN_WHATSAPP, VEN_SENHA], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro interno do servidor");
            return;
        }
    });
});

app.post('/inserirCliente', (req, res) => {
    const { CLI_NOME, CLI_EMAIL, CLI_DATA, CLI_SEXO, CLI_DOCUMENTO, CLI_ENDERECO, CLI_TELEFONE, CLI_WHATSAPP, CLI_SENHA } = req.body;

    let SQL = "INSERT INTO CLI_CLIENTE(CLI_NOME, CLI_EMAIL, CLI_DATA, CLI_SEXO, CLI_DOCUMENTO, CLI_ENDERECO, CLI_TELEFONE, CLI_WHATSAPP, CLI_SENHA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    connection.query(SQL, [CLI_NOME, CLI_EMAIL, CLI_DATA, CLI_SEXO, CLI_DOCUMENTO, CLI_ENDERECO, CLI_TELEFONE, CLI_WHATSAPP, CLI_SENHA], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro interno do servidor");
            return;
        }
        return res.status(200).json({ message: "Cliente inserido com sucesso"});
    });
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;  // Adiciona os dados do usuário decodificados ao objeto de solicitação
        next();
    });
};

app.get('/rotaProtegida', verifyToken, (req, res) => {
    // ... código da rota protegida ...
});

app.listen(3003, () => {console.log(`funcionando na porta ${PORT}`)})