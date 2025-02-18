const express = require("express");
const db = require("../db/connection");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Rota para adicionar transações
router.post("/transaction", authMiddleware, (req, res) => {
  const { value, type, category, description } = req.body;
  const user_id = req.user.id_user;

  if (!value || typeof type !== "boolean" || !category || !description) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios e tipo deve ser booleano!" });
  }

  const sql = "INSERT INTO transactions (user_id, amount, description, type, category_id, date) VALUES (?, ?, ?, ?, ?, ?)";
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

router.post("/transactiondate", authMiddleware, (req, res) => {
  const { value, type, category, description, date } = req.body;
  const user_id = req.user.id_user;

  if (!value || typeof type !== "boolean" || !category || !description || !date) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios e tipo deve ser booleano!" });
  }

  const sql = "INSERT INTO transactions (user_id, amount, description, type, category_id, date) VALUES (?, ?, ?, ?, ?, ?)";
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

router.delete("/transaction/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id_user;

  if (!id) {
    return res.status(400).json({ message: "ID da transação é obrigatório!" });
  }

  const sql = "DELETE FROM transactions WHERE id = ? AND user_id = ?";

  db.query(sql, [id, user_id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir transação no banco:", err);
      return res.status(500).json({ message: "Erro ao excluir transação", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transação não encontrada ou não pertence ao usuário." });
    }

    res.status(200).json({ message: "Transação excluída com sucesso!" });
  });
});

// router.put("/transaction/:id", authMiddleware, (req, res) => {
//   const { value, description, type, category } = req.body;
//   const transactionId = req.params.id;
//   const user_id = req.user.id_user;


//   const transactionType = type ? 1 : 0;

//   const sql = `
//     UPDATE transactions
//     SET amount = ?, description = ?, type = ?, category_id = ?, date = ?
//     WHERE id = ? AND user_id = ?;
//   `;
//   const values = [value, description, transactionType, category, new Date().toISOString().slice(0, 10), transactionId, user_id];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Erro ao atualizar transação no banco:", err);
//       return res.status(500).json({ message: "Erro ao atualizar transação", error: err });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Transação não encontrada ou não pertence ao usuário." });
//     }

//     res.status(200).json({ message: "Transação atualizada com sucesso!" });
//   });
// });

router.put("/transaction/:id", authMiddleware, (req, res) => {
  const { amount, description, type, category_id } = req.body;
  const transactionId = req.params.id;
  const user_id = req.user.id_user;

  if (!amount || !description || !category_id) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const transactionType = type ? 1 : 0;

  const sql = `
    UPDATE transactions
    SET amount = ?, description = ?, type = ?, category_id = ?, date = ?
    WHERE id = ? AND user_id = ?;
  `;
  const values = [
    amount, 
    description, 
    transactionType, 
    category_id, 
    new Date().toISOString().slice(0, 10), 
    transactionId, 
    user_id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar transação no banco:", err);
      return res.status(500).json({ message: "Erro ao atualizar transação", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transação não encontrada ou não pertence ao usuário." });
    }

    res.status(200).json({ message: "Transação atualizada com sucesso!" });
  });
});


router.get("/transactionslist", authMiddleware, (req, res) => {
  const user_id = req.user.id_user;
  const sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 10";

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar transações:", err);
      return res.status(500).json({ message: "Erro ao buscar transações" });
    }
    res.status(200).json(results);
  });
});



router.get("/limit_transactionslist", authMiddleware, (req, res) => {
  const user_id = req.user.id_user;
  const sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 5";

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar transações:", err);
      return res.status(500).json({ message: "Erro ao buscar transações" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
