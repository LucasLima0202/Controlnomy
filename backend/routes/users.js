const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Rota de registro
router.post("/register", (req, res) => {
  const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Erro ao registrar usuário:", err);
      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  });
});

// Rota de login
router.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Erro no servidor:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    if (data.length > 0 && req.body.password === data[0].password) {
      return res.status(200).json({ message: "Sucesso", token: "seu_token_aqui" });
    } else {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
  });
});

module.exports = router;
