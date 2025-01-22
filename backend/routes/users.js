const express = require("express");
const db = require("../db/connection");
const cors = require("cors");

const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
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

router.post("/starthereregistevalue", (req, res) => {
  const { total_amount, released_amount, percent_invest } = req.body;

  if (total_amount === undefined || released_amount === undefined || percent_invest === undefined) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const sql = `
    UPDATE users 
    SET total_amount = ?, released_amount = ?, percent_invest = ? 
    WHERE id_user = 1`; // Atualiza o registro do usuário com ID 1
  const values = [parseFloat(total_amount), parseFloat(released_amount), parseFloat(percent_invest)];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar valores:", err);
      return res.status(500).json({ message: "Erro ao atualizar valores no banco de dados.", error: err });
    }
    res.status(200).json({ message: "Valores atualizados com sucesso!" });
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
