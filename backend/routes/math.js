const express = require("express");
const db = require("../db/connection");
const router = express.Router();

router.get("/currentamountbmonth/:year/:month", (req, res) => {
    const { year, month } = req.params;
  
    const sql = `
      SELECT 
        FORMAT(
          (total_amount * released_amount / 100) + 
          (SELECT COALESCE(SUM(amount), 0) 
            FROM transactions 
            WHERE type = 0 
            AND user_id = 1 
            AND DATE_FORMAT(date, '%Y-%m') <= ?) - 
          (SELECT COALESCE(SUM(amount), 0) 
            FROM transactions 
            WHERE type = 1 
            AND user_id = 1 
            AND DATE_FORMAT(date, '%Y-%m') <= ?), 2) AS saldo_atual
      FROM users 
      WHERE id_user = 1`;
  
    db.query(sql, [`${year}-${month}`, `${year}-${month}`], (err, result) => {
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
  router.get("/releasedamountbmonth/:year/:month", (req, res) => {
    const { year, month } = req.params;
  
    // Calcular o saldo atual acumulado até o mês atual
    const sql = ` SELECT FORMAT(
      (total_amount * released_amount / 100), 2
    ) AS saldo_liberado
    FROM users 
    WHERE id_user = 1`;
  
    // Execute a query passando o mês e ano atual como parâmetros
    db.query(sql, [month, year, month, year, month, year, month, year], (err, result) => {
      if (err) {
        console.error("Erro ao buscar saldo liberado:", err);
        return res.status(500).json({ message: "Erro ao buscar saldo liberado" });
      }
  
      // Verifica se o resultado foi encontrado
      if (result.length > 0) {
        res.status(200).json({
          saldo_atual: result[0].saldo_atual,
          saldo_liberado: result[0].saldo_liberado,
        });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    });
  });
  
  
router.get("/spenttotalbmonth/:year/:month", (req, res) => {
    const { year, month } = req.params;

    const sql = `
      SELECT FORMAT(
        (SELECT COALESCE(SUM(amount), 0) FROM transactions 
          WHERE user_id = 1 AND type = 1 AND MONTH(date) = ? AND YEAR(date) = ?), 2
      ) AS total_gastos
      FROM users WHERE id_user = 1`;

    db.query(sql, [month, year], (err, result) => {
        if (err) {
            console.error("Erro ao buscar gasto total:", err);
            return res.status(500).json({ message: "Erro ao buscar gasto total" });
        }
        if (result.length > 0) {
            res.status(200).json({ total_gastos: result[0].total_gastos });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});

router.get("/earntotalbmonth/:year/:month", (req, res) => {
    const { year, month } = req.params;

    const sql = `
      SELECT FORMAT(
        (SELECT COALESCE(SUM(amount), 0) FROM transactions 
          WHERE user_id = 1 AND type = 0 AND MONTH(date) = ? AND YEAR(date) = ?), 2
      ) AS total_ganho
      FROM users WHERE id_user = 1`;

    db.query(sql, [month, year], (err, result) => {
        if (err) {
            console.error("Erro ao buscar ganho total:", err);
            return res.status(500).json({ message: "Erro ao buscar ganho total" });
        }
        if (result.length > 0) {
            res.status(200).json({ total_ganho: result[0].total_ganho });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});



/**
 * 📊 1. Gráfico de Gastos Semanais (Comparação de ganhos e despesas)
 * 
 * - Mostra os gastos e ganhos por semana dentro do mês atual.
 */
router.get("/chart_weekly_spending/:year/:month", (req, res) => {
  const { year, month } = req.params;

  const sql = `
    SELECT 
      WEEK(date) AS week,
      FORMAT(SUM(CASE WHEN type = 1 THEN amount ELSE 0 END), 2) AS total_gastos,
      FORMAT(SUM(CASE WHEN type = 0 THEN amount ELSE 0 END), 2) AS total_ganhos
    FROM transactions
    WHERE user_id = 1 AND YEAR(date) = ? AND MONTH(date) = ?
    GROUP BY week
    ORDER BY week;
  `;

  db.query(sql, [year, month], (err, result) => {
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
router.get("/chart_category_spending/:year", (req, res) => {
  const { year } = req.params;

  const sql = `
    SELECT 
      c.name AS categoria,
      FORMAT(SUM(t.amount), 2) AS total_gasto
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = 1 AND t.type = 1 AND YEAR(t.date) = ?
    GROUP BY c.name
    ORDER BY total_gasto DESC;
  `;

  db.query(sql, [year], (err, result) => {
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
router.get("/chart_money_flow/:year", (req, res) => {
  const { year } = req.params;

  const sql = `
    SELECT 
      MONTH(date) AS mes,
      FORMAT(SUM(CASE WHEN type = 1 THEN amount ELSE 0 END), 2) AS total_gastos,
      FORMAT(SUM(CASE WHEN type = 0 THEN amount ELSE 0 END), 2) AS total_ganhos
    FROM transactions
    WHERE user_id = 1 AND YEAR(date) = ?
    GROUP BY mes
    ORDER BY mes;
  `;

  db.query(sql, [year], (err, result) => {
      if (err) {
          console.error("Erro ao buscar fluxo de dinheiro:", err);
          return res.status(500).json({ message: "Erro ao buscar fluxo de dinheiro" });
      }
      res.status(200).json(result);
  });
});



module.exports = router;