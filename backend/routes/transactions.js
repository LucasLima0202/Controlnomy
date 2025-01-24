const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Rota para adicionar transações
router.post("/transaction", (req, res) => {
  const { value, type, category, description } = req.body;

  console.log("Dados recebidos no backend:", { value, type, category, description });

  if (!value || typeof type !== "boolean" || !category || !description) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios e tipo deve ser booleano!" });
  }

  const sql = "INSERT INTO transactions (user_id, amount, description, type, category_id, date) VALUES (?, ?, ?, ?, ?, ?)";
  const user_id = 1;
  const date = new Date().toISOString().slice(0, 10);

  const transactionType = type ? 1 : 0;
  const values = [user_id, value, description, transactionType, category, date];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar transação no banco:", err);
      return res.status(500).json({ message: "Erro ao adicionar transação", error: err });
    }
    res.status(200).json({ message: "Transação adicionada com sucesso!" });
  });
});

module.exports = router;

router.post("/transactiondate", (req, res) => {
  const { value, type, category, description, date } = req.body;

  console.log("Dados recebidos no backend:", { value, type, category, description, date });

  if (!value || typeof type !== "boolean" || !category || !description || !date) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios e tipo deve ser booleano!" });
  }

  const sql = "INSERT INTO transactions (user_id, amount, description, type, category_id, date) VALUES (?, ?, ?, ?, ?, ?)";
  const user_id = 1;

  const transactionType = type ? 1 : 0;
  const values = [user_id, value, description, transactionType, category, date];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error("Erro ao adicionar transação no banco:", err);
          return res.status(500).json({ message: "Erro ao adicionar transação", error: err });
      }
      res.status(200).json({ message: "Transação adicionada com sucesso!" });
  });
});


module.exports = router;



router.delete("/transaction/:id", (req, res) => {
  const { id } = req.params; // Obtém o ID da transação a ser excluída do parâmetro da URL
  
  console.log("ID da transação a ser excluída:", id);

  // Verifica se o ID foi fornecido
  if (!id) {
    return res.status(400).json({ message: "ID da transação é obrigatório!" });
  }

  // SQL para deletar a transação
  const sql = "DELETE FROM transactions WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir transação no banco:", err);
      return res.status(500).json({ message: "Erro ao excluir transação", error: err });
    }

    // Verifica se a transação foi encontrada e excluída
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    // Retorna uma mensagem de sucesso
    res.status(200).json({ message: "Transação excluída com sucesso!" });
  });
});

router.put("/transaction/:id", (req, res) => {
  const { value, description, type, category } = req.body;
  const transactionId = req.params.id;

  // Verificação de parâmetros
  if (!value || !description || !type || !category) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  // Verificar tipo de transação (1 = Despesa, 0 = Ganho)
  const transactionType = type === 1 ? 1 : 0;

  const sql = `
    UPDATE transactions
    SET amount = ?, description = ?, type = ?, category_id = ?, date = ?
    WHERE id = ?;
  `;
  const values = [value, description, transactionType, category, new Date().toISOString().slice(0, 10), transactionId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar transação no banco:", err);
      return res.status(500).json({ message: "Erro ao atualizar transação", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    res.status(200).json({ message: "Transação atualizada com sucesso!" });
  });
});



router.get("/transactionslist", (req, res) => {
  const sql = "SELECT * FROM transactions ORDER BY date DESC LIMIT 10"; // Ordena por data, as mais recentes primeiro
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar transações:", err);
      return res.status(500).json({ message: "Erro ao buscar transações" });
    }
    res.status(200).json(results); // Retorna os dados encontrados
  });
});

module.exports = router;
