const express = require("express");
const db = require("../db/connection");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.use(cors());
router.use(express.json());


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

router.post("/alteregister", authMiddleware, (req, res) => {
  const { name, email, password } = req.body;
  const user_id = req.user.id_user;

  const sql = `
  UPDATE users 
  SET name = ?, email = ?, password = ?
  WHERE id_user = ?
  `;
  const values = [new_name, new_email, new_password];

  db.query(sql, [name, email, password, user_id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  });
});



router.post("/starthereregistevalue", authMiddleware, (req, res) => {
  const { total_amount, released_amount, percent_invest } = req.body;
  const user_id = req.user.id_user; // Certifique-se de que `authMiddleware` define `req.user`

  // Verificar se todos os campos necessários estão preenchidos
  if (total_amount === undefined || released_amount === undefined || percent_invest === undefined) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const sql = `
    INSERT INTO start_values (user_id, total_amount, released_amount, percent_invest)
    VALUES (?, ?, ?, ?)
  `;

  const values = [user_id, total_amount, released_amount, percent_invest];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao registrar valores:", err);
      return res.status(500).json({ message: "Erro ao registrar valores", error: err });
    }

    res.status(201).json({ message: "Valores registrados com sucesso!", id: result.insertId });
  });
});





router.get("/getuser", authMiddleware ,  (req, res) => {
  const user_id = req.user.id_user;
  const sql = "SELECT name, email FROM users WHERE id_user = ?";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
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
      const token = jwt.sign({ id_user: data[0].id_user }, process.env.JWT_SECRET, { expiresIn: '5h' });
      return res.status(200).json({ message: "Sucesso", token, user: { id: data[0].id_user, name: data[0].name, email: data[0].email } });
    } else {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
  });
});

module.exports = router;
