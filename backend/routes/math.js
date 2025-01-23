const express = require("express");
const db = require("../db/connection");
const router = express.Router();


router.get("/releasedamount", (req, res) => {
    const sql = "SELECT FORMAT(total_amount * released_amount / 100, 2) AS saldo_liberado FROM users WHERE id_user = 1";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao saldo liberado:", err);
            return res.status(500).json({ message: "Erro ao buscar saldo liberado" });
        }
        if (result.length > 0) {
            res.status(200).json({ saldo_liberado: result[0].saldo_liberado });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});

router.get("/currentamount", (req, res) => {
    const sql = "SELECT FORMAT((total_amount * released_amount / 100) + (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 0 AND user_id = 1) - (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 1 AND user_id = 1), 2) AS saldo_atual FROM users WHERE id_user = 1";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao saldo atual:", err);
            return res.status(500).json({ message: "Erro ao buscar saldo atual" });
        }
        if (result.length > 0) {
            res.status(200).json({ saldo_atual: result[0].saldo_atual });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});


router.get("/spenttotal", (req, res) => {
    const sql = "SELECT  FORMAT((SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = 1 AND type = 1), 2) AS total_gastos FROM users where id_user=1";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao saldo atual:", err);
            return res.status(500).json({ message: "Erro ao buscar gasto total" });
        }
        if (result.length > 0) {
            res.status(200).json({ total_gastos: result[0].total_gastos });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});

router.get("/earntotal", (req, res) => {
    const sql = "SELECT FORMAT((SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = 1 AND type = 0), 2) AS total_ganho FROM users where id_user=1";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao saldo atual:", err);
            return res.status(500).json({ message: "Erro ao buscar ganho total" });
        }
        if (result.length > 0) {
            res.status(200).json({ total_ganho: result[0].total_ganho });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
});


module.exports = router;