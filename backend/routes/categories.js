const express = require("express");
const db = require("../db/connection");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();



// Rota para buscar categorias
router.get("/categories", authMiddleware, (req, res) => {
  const user_id = req.user.id_user;
  const sql = "SELECT * FROM categories WHERE user_id = ?";

  db.query(sql, [user_id],(err, result) => {
    if (err) {
      console.error("Erro ao buscar categorias:", err);
      return res.status(500).json({ message: "Erro ao buscar categorias" });
    }
    res.status(200).json(result);
  });
});

// Rota para adicionar categorias
router.post("/addcategories", authMiddleware, (req, res) => {
  const { name, typing, icon } = req.body;
  const user_id = req.user.id_user;

  if (!name || !Number.isInteger(typing) || !icon) {
    return res.status(400).json({ message: "Nome, tipo (ID numérico) e ícone são obrigatórios!" });
  }


  const sql = "INSERT INTO categories (name, user_id, typing_id, icon) VALUES (?, ?, ?, ?)";
  const values = [name, user_id, typing, icon];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar categoria no banco:", err);
      return res.status(500).json({ message: "Erro ao adicionar categoria", error: err });
    }
    res.status(200).json({ message: "Categoria adicionada com sucesso!" });
  });
});

module.exports = router;
