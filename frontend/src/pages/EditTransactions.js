import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SearchListTransaction from "../components/comptransactions/SearchListTransaction/SearchListTransaction";
import BoxGlobal from "../components/BoxGlobal";
import Lottie from "react-lottie";
import animationEdit from "../assets/lotties/edit.json";
import { Column } from "../components/comptransactions/AddingCategory/AddingCategory.styled";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationEdit,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
const Body = styled.body `
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
const Section = styled.section `
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #343A40;
`;
const Title = styled.h1 `
  font-size: 1.5rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
  margin-bottom: 2%;
  margin-top:1%;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const Content = styled.div `
  font-size: 1.2rem;
  text-align: center;
  color: #4b4b4b;
  line-height:30px;
  margin-top:5%;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const EditTransactions = () => {
    return (_jsxs(Body, { children: [_jsx(Navbar, {}), _jsxs(Section, { children: [_jsx(SearchListTransaction, {}), _jsx(BoxGlobal, { children: _jsxs(Column, { children: [_jsx(Title, { children: "Controle seus Gastos" }), _jsx(Content, { children: "Ap\u00F3s inserir os dados da transa\u00E7\u00E3o confira seu Dashboard" }), _jsx(Lottie, { options: defaultOptions, height: 180, width: 180 }), _jsx(Link, { to: '/Dashboard', children: _jsxs(Button, { fontsize: "0.8rem", children: ["IR PARA O DASHBOARD ", _jsx(FontAwesomeIcon, { icon: faArrowRight })] }) })] }) })] })] }));
};
export default EditTransactions;
