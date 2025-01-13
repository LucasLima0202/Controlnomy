// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const db = require('./db/connection');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Rota de teste
// app.get('/', (req, res) => {
//   res.send('Servidor funcionando!');
// });

// // Rota para registrar usuários
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Criptografar a senha
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//     db.query(sql, [username, email, hashedPassword], (err, result) => {
//       if (err) {
//         console.error('Erro ao registrar usuário:', err);
//         return res.status(500).send('Erro ao registrar usuário');
//       }
//       res.status(201).send('Usuário registrado com sucesso!');
//     });
//   } catch (err) {
//     res.status(500).send('Erro no servidor');
//   }
// });

// // Rota para login
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const sql = 'SELECT * FROM users WHERE email = ?';
//   db.query(sql, [email], async (err, results) => {
//     if (err || results.length === 0) {""
//       return res.status(401).send('Usuário não encontrado');
//     }

//     const user = results[0];
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return res.status(401).send('Senha incorreta');
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ token });
//   });
// });

// // Iniciar o servidor
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });




const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para processar JSON no corpo da requisição

// Configuração do banco de dados


db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados.");
  }
});

// Rota de registro
app.post('/Register', (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Erro ao inserir no banco:", err);
      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  });
});

app.post("/Login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ?";
  
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Erro ao consultar o banco:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    if (data.length > 0) {
      if (req.body.password === data[0].password) {
        return res.status(200).json("Sucesso");
      } else {
        return res.status(401).json({ message: "Senha incorreta" });
      }
    } else {
      return res.status(404).json({ message: "Email não encontrado" });
    }
  });
});



// Iniciar o servidor
app.listen(8081, () => {
  console.log("Servidor rodando na porta 8081");
});
