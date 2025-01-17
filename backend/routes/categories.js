const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Rota para buscar categorias
router.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar categorias:", err);
      return res.status(500).json({ message: "Erro ao buscar categorias" });
    }
    res.status(200).json(result);
  });
});

// Rota para adicionar categorias
router.post("/addcategories", (req, res) => {
  const { name, typing, icon } = req.body;

  console.log("Dados recebidos no backend:", { name, typing, icon });

  if (!name || !Number.isInteger(typing) || !icon) {
    return res.status(400).json({ message: "Nome, tipo (ID numérico) e ícone são obrigatórios!" });
  }

  const sql = "INSERT INTO categories (name, user_id, typing_id, icon) VALUES (?, ?, ?, ?)";
  const values = [name, 1, typing, icon];  // Aqui estamos agora passando o nome do ícone ao invés de um ID.

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar categoria no banco:", err);
      return res.status(500).json({ message: "Erro ao adicionar categoria", error: err });
    }
    res.status(200).json({ message: "Categoria adicionada com sucesso!" });
  });
});


module.exports = router;
