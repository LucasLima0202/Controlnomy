const db = require('./db/connection');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 



db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados.");
  }
});

// Middleware para logs
app.use((req, res, next) => {
  console.log(`Rota acessada: ${req.method} ${req.url}`);
  next();
});


// Rota de registro
app.post('/Register', (req, res) => {
  const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Erro ao inserir no banco:", err);
      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  });
});

app.post("/Login", (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ?";

  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Erro no servidor:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    if (data.length > 0) {
      if (req.body.password === data[0].password) {
        // Sucesso: Envia um token (simulação)
        return res.status(200).json({ message: "Sucesso", token: "seu_token_aqui" });
      } else {
        // Senha incorreta
        return res.status(401).json({ message: "Senha incorreta" });
      }
    } else {
      // Email não encontrado
      return res.status(404).json({ message: "Email não encontrado" });
    }
  });
});

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam de 0, então somamos 1
  const day = String(date.getDate()).padStart(2, '0'); // Adiciona 0 à esquerda se for menor que 10
  return `${year}-${month}-${day}`;
};

module.exports = { getCurrentDate };

app.post("/api/addcategories", (req, res) => {
  const { name, typing } = req.body;

  console.log("Dados recebidos no backend:", { name, typing });

  // Verifica se o nome está presente e se typing é um número
  if (!name || !Number.isInteger(typing)) {
    return res.status(400).json({ message: "Nome e tipo (ID numérico) são obrigatórios!" });
  }

  const sql = "INSERT INTO categories (name, user_id, typing_id) VALUES (?, ?, ?)";
  const values = [name, 1, typing]; // Envia o ID do typing diretamente

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar categoria no banco:", err);
      return res.status(500).json({ message: "Erro ao adicionar categoria", error: err });
    }
    res.status(200).json({ message: "Categoria adicionada com sucesso!" });
  });
});




// Rota para obter os typings
app.get("/api/typing", (req, res) => {
  const sql = "SELECT * FROM typing"; // Certifique-se de que há uma tabela chamada "typings" no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar typing:", err);
      return res.status(500).json({ message: "Erro ao buscar typing" });
    }
    res.status(200).json(result); // Retorna os dados dos typings
  });
});


// Rota para buscar categorias
app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar categorias:", err);
      return res.status(500).json({ message: "Erro ao buscar categorias" });
    }
    res.status(200).json(result);
  });
});


app.post("/api/transaction", (req, res) => {
  const { value, type, category, description } = req.body;

  console.log("Dados recebidos no backend:", { value, type, category, description });

  // Validação dos campos
  if (!value || typeof type !== "boolean" || !category || !description) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios e tipo deve ser booleano!" });
  }

  const sql = "INSERT INTO transactions (user_id, amount, description, type, category_id, date) VALUES (?, ?, ?, ?, ?, ?)";
  const user_id = 1; // Exemplo de ID de usuário fixo
  const date = new Date().toISOString().slice(0, 10); // Data no formato YYYY-MM-DD

  // Converte o campo type para 1 (true) ou 0 (false)
  const transactionType = type ? 1 : 0; // 1 = Expense, 0 = Gain
  const values = [user_id, value, description, transactionType, category, date];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar transação no banco:", err);
      return res.status(500).json({ message: "Erro ao adicionar transação", error: err });
    }
    res.status(200).json({ message: "Transação adicionada com sucesso!" });
  });
});



const PORT = 8081; // Altere para outra porta, como 3001, se necessário
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
