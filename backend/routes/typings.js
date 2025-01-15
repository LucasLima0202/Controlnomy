const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Rota para obter typings
router.get("/typing", (req, res) => {
  const sql = "SELECT * FROM typing";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar typing:", err);
      return res.status(500).json({ message: "Erro ao buscar typing" });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
