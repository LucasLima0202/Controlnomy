import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getCurrentDate } from "../utils/data";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddingOldTransaction from "../components/comptransactions/AddingOldTransaction";
import AddingTransaction from "../components/comptransactions/AddingTransaction";
import AddingCategory from "../components/comptransactions/AddingCategory";
import TransactionList from "../components/comptransactions/ListTransaction";

// Estilos
const Body = styled.body`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  background-color: #F5F5F5;
  padding-top: 80px; /* Espaço reservado para a Navbar */
  min-height: 100vh; /* Garante que o conteúdo ocupe toda a altura da tela */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #343A40;
`;


const Section = styled.section`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  background-color: #F5F5F5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #343A40;
`;



const Transactions = () => {
 

  return (
    <Body>
      <Navbar />
      <Section>
        <AddingTransaction/>
        <AddingOldTransaction/>
        <AddingCategory/>
        <TransactionList />
      </Section>
    </Body>
  );
};

export default Transactions;
