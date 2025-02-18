const express = require("express");
const db = require("../db/connection");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/currentamountbmonth/:year/:month", authMiddleware, (req, res) => {
  const { year, month } = req.params;
  const user_id = req.user.id_user;

  const sql = `
    SELECT 
      FORMAT(
        (total_amount * released_amount / 100) + 
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 0 AND user_id = ? AND DATE_FORMAT(date, '%Y-%m') <= ?) - 
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 1 AND user_id = ? AND DATE_FORMAT(date, '%Y-%m') <= ?), 2) AS saldo_atual
    FROM users WHERE id_user = ?`;

  db.query(sql, [user_id, `${year}-${month}`, user_id, `${year}-${month}`, user_id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar saldo atual:", err);
      return res.status(500).json({ message: "Erro ao buscar saldo atual" });
    }
    if (result.length > 0) {
      res.status(200).json({ saldo_atual: result[0].saldo_atual });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  });
});

router.get("/releasedamountbmonth/:year/:month", authMiddleware, (req, res) => {
  const user_id = req.user.id_user;
  const sql = `SELECT FORMAT((total_amount * released_amount / 100), 2) AS saldo_liberado FROM users WHERE id_user = ?`;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar saldo liberado:", err);
      return res.status(500).json({ message: "Erro ao buscar saldo liberado" });
    }
    if (result.length > 0) {
      res.status(200).json({ saldo_liberado: result[0].saldo_liberado });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  });
});
  
router.get("/spenttotalbmonth/:year/:month", authMiddleware, (req, res) => {
  const { year, month } = req.params;
  const user_id = req.user.id_user;

  const sql = `
    SELECT FORMAT((SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = ? AND type = 1 AND MONTH(date) = ? AND YEAR(date) = ?), 2) AS total_gastos`;

  db.query(sql, [user_id, month, year], (err, result) => {
      if (err) {
          console.error("Erro ao buscar gasto total:", err);
          return res.status(500).json({ message: "Erro ao buscar gasto total" });
      }
      res.status(200).json(result[0]);
  });
});

router.get("/earntotalbmonth/:year/:month", authMiddleware, (req, res) => {
  const { year, month } = req.params;
  const user_id = req.user.id_user;

  const sql = `
    SELECT FORMAT((SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = ? AND type = 0 AND MONTH(date) = ? AND YEAR(date) = ?), 2) AS total_ganho`;

  db.query(sql, [user_id, month, year], (err, result) => {
      if (err) {
          console.error("Erro ao buscar ganho total:", err);
          return res.status(500).json({ message: "Erro ao buscar ganho total" });
      }
      res.status(200).json(result[0]);
  });
});


/**
 * 📊 1. Gráfico de Gastos Semanais (Comparação de ganhos e despesas)
 * 
 * - Mostra os gastos e ganhos por semana dentro do mês atual.
 */
router.get("/chart_weekly_spending/:year/:month", authMiddleware, (req, res) => {
  const { year, month } = req.params;
  const user_id = req.user.id_user;

  const sql = `
    SELECT 
      WEEK(date) AS week,
      FORMAT(SUM(CASE WHEN type = 1 THEN amount ELSE 0 END), 2) AS total_gastos,
      FORMAT(SUM(CASE WHEN type = 0 THEN amount ELSE 0 END), 2) AS total_ganhos
    FROM transactions
    WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ?
    GROUP BY week
    ORDER BY week;
  `;

  db.query(sql, [user_id, year, month], (err, result) => {
      if (err) {
          console.error("Erro ao buscar dados semanais:", err);
          return res.status(500).json({ message: "Erro ao buscar dados semanais" });
      }
      res.status(200).json(result);
  });
});

/**
* 📊 2. Gráfico de Gastos por Categoria (Anual)
* 
* - Exibe quanto foi gasto em cada categoria ao longo do ano.
*/
router.get("/chart_category_spending/:year",authMiddleware, (req, res) => {
  const { year } = req.params;
  const user_id = req.user.id_user;

  const sql = `
    SELECT 
      c.name AS categoria,
      FORMAT(SUM(t.amount), 2) AS total_gasto
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ? AND t.type = 1 AND YEAR(t.date) = ?
    GROUP BY c.name
    ORDER BY total_gasto DESC;
  `;

  db.query(sql, [user_id, year], (err, result) => {
      if (err) {
          console.error("Erro ao buscar gastos por categoria:", err);
          return res.status(500).json({ message: "Erro ao buscar gastos por categoria" });
      }
      res.status(200).json(result);
  });
});

/**
* 📊 3. Gráfico de Fluxo de Dinheiro (Mensal)
* 
* - Mostra o fluxo de dinheiro por mês, considerando ganhos e despesas.
*/
router.get("/chart_money_flow/:year", authMiddleware ,(req, res) => {
  const { year } = req.params;
  const user_id = req.user.id_user;

  const sql = `
    SELECT 
      MONTH(date) AS mes,
      FORMAT(SUM(CASE WHEN type = 1 THEN amount ELSE 0 END), 2) AS total_gastos,
      FORMAT(SUM(CASE WHEN type = 0 THEN amount ELSE 0 END), 2) AS total_ganhos
    FROM transactions
    WHERE user_id = ? AND YEAR(date) = ?
    GROUP BY mes
    ORDER BY mes;
  `;

  db.query(sql, [user_id, year], (err, result) => {
      if (err) {
          console.error("Erro ao buscar fluxo de dinheiro:", err);
          return res.status(500).json({ message: "Erro ao buscar fluxo de dinheiro" });
      }
      res.status(200).json(result);
  });
});



module.exports = router;