import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
`;

const GroupWelcome = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 7px;
  align-items: center;
  flex-direction: column;
  background-color: #FFFFFF;
  margin-top: 7%;
  margin-bottom: 7%;
  padding: 4%;
  border-radius: 8px;
  box-shadow: rgba(201, 201, 201, 0.15) 0px 4px 16px, rgba(201, 201, 201, 0.15) 0px 8px 32px;
`;

const GroupLine = styled.div`
  width: 90%;
  border: solid #F1F1F1 0.8px;
  display: flex;
  justify-content: center;
  gap: 7px;
  align-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #FFFFFF;
  padding: 4%;
  border-radius: 8px;
`;
const Button = styled.button`
  outline: none;
  border: none;
  height: 55px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  margin-top:6%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  font-weight:600;
  padding-left:5%;
  padding-right:5%;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
  @media (max-width: 568px) {
  font-size:0.8rem;
  width:100%;
  }
`;
const StyledTable = styled.div`
  width: 100%;
  overflow-x: auto; /* Permite rolagem horizontal em telas pequenas */
  margin-top: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    text-align: left;
  }

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    text-align: center;
  }

  @media (max-width: 768px) {
    /* Para telas menores, ajuste a tabela */
    table {
      font-size: 0.9rem;
    }

    th,
    td {
      padding: 8px;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TransactionList = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Faz uma requisição ao backend
    axios
      .get("http://localhost:8081/api/transactionslist")
      .then((response) => {
        setTransactions(response.data); // Salva os dados na state
      })
      .catch((error) => {
        console.error("Erro ao buscar transações:", error);
      });
  }, []);

  return (
    <GroupWelcome>
      <GroupLine>
        <Container>
          <Title>Últimas Transações</Title>
          <StyledTable>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.type === 1 ? "Despesa" : "Ganho"}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </StyledTable>
          <Link to={"/EditTransactions"}>
            <Button type="submit">
                          <FontAwesomeIcon icon={faEdit} color="#FFFFFF" fontSize={18} />
                          ㅤEditar Transação
            </Button>
          </Link>
            
        </Container>
      </GroupLine>
    </GroupWelcome>
  );
};

export default TransactionList;
