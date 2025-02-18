const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/session", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Sessão ativa", user: req.user });
});

module.exports = router;
