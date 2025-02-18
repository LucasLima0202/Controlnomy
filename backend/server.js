const express = require("express");
const cors = require("cors");
const db = require("./db/connection");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

// Verificar conexão com o banco
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados.");
  }
});

// Usar as rotas
app.use("/api", routes);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
