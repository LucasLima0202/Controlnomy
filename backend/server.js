const db = require('./db/connection');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 



db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados.");
  }
});


// Rota de registro
app.post('/Register', (req, res) => {
  const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
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
  const sql = "SELECT * FROM users WHERE `email` = ?";

  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Erro no servidor:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    if (data.length > 0) {
      if (req.body.password === data[0].password) {
        // Sucesso: Envia um token (simulação)
        return res.status(200).json({ message: "Sucesso", token: "seu_token_aqui" });
      } else {
        // Senha incorreta
        return res.status(401).json({ message: "Senha incorreta" });
      }
    } else {
      // Email não encontrado
      return res.status(404).json({ message: "Email não encontrado" });
    }
  });
});


app.post("/api/categories", (req, res) => {
  const { name, typing } = req.body;
  const userId = 1; // Substitua com o ID do usuário logado

  if (!name || !typing) {
    return res.status(400).json({ message: "Nome e tipo são obrigatórios!" });
  }

  const sql = "INSERT INTO categories (name, user_id, typing_id) VALUES (?, ?, ?)";
  const values = [name, userId, typing];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar categoria:", err);  // Log detalhado do erro
      return res.status(500).json({ message: "Erro ao adicionar categoria", error: err });
    }
    res.status(200).json({ message: "Categoria adicionada com sucesso!" });
  });
});

// Iniciar o servidor
app.listen(8081, () => {
  console.log("Servidor rodando na porta 8081");
});
