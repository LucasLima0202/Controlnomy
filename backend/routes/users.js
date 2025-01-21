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
  const { total_amount, released_amount } = req.body;

  if (!total_amount || !released_amount) {
    return res.status(400).json({ message: "Os valores 'total_amount' e 'released_amount' são obrigatórios." });
  }

  const sql = "INSERT INTO users (`total_amount`, `released_amount`) VALUES (?, ?)";
  const values = [parseFloat(total_amount), parseFloat(released_amount)]; 

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir valor total do usuário:", err);
      return res.status(500).json({ message: "Erro ao registrar valor total do usuário", error: err });
    }
    res.status(201).json({ message: "Valor total do usuário registrado com sucesso!" });
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
