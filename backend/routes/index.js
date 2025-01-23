const express = require("express");
const categoriesRoutes = require("./categories");
const transactionsRoutes = require("./transactions");
const typingsRoutes = require("./typings");
const usersRoutes = require("./users");
const mathRoutes = require("./math");
const router = express.Router();

// Registrar as rotas
router.use(mathRoutes);
router.use(categoriesRoutes);
router.use(transactionsRoutes);
router.use(typingsRoutes);
router.use(usersRoutes);

module.exports = router;
