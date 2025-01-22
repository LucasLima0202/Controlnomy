import styled from "styled-components";
import Navbar from "../components/Navbar";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GetStartHereValidation from "../hooks/StartHereValidation";

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
const ErrorSpan = styled.span<{ visible: boolean }>`
  color: #960707;
  font-size: 0.98rem;
  margin-top: 5px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")}; /* Controla a visibilidade */
`;

const Content = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #4b4b4b;
  line-height: 25px;
  padding-left: 2%;
  padding-right: 2%;
  margin-top: 7%;
  margin-bottom: 4%;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledInput = styled.input`
  height: 55px;
  margin-bottom: 10px;
  outline: none;
  border: solid 1px #d9d9d9;
  background: rgba(255, 255, 255, 0.2);
  color: #6f6f6f;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  font-weight: 600;
  width: 100%;
  height: 65px;
  background: #282b2f;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5%;
  margin-top: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  color: #7a7a7a;
  font-size: 0.9rem;
  text-align: left;
  justify-content: flex-start;
`;

const Text = styled.p`
  color: #666666;
  font-size: 16px;
`;

const Column = styled.div`
  display: flex;
  align-items: stretch;
  align-self: stretch;
  flex-flow: column nowrap;
  margin-top: 4%;
  margin-bottom: 5%;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  color: #343a40;
  font-weight: 600;
  padding-left: 2%;
  padding-right: 2%;
  margin-bottom: 2%;
  margin-top: 1%;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;


interface FormValues {
  total_amount: number;
  released_amount: number;
  percent_invest: number;  
  }

interface Errors {
  firstTabInput?: string;
  releasedPercentage?: string;
  investmentPercentage?: string;
}



const StartHereForm = () => {
  const [firstTabInput, setFirstTabInput] = useState<string>("0");
  const [releasedPercentage, setReleasedPercentage] = useState<string>("0");
  const [investmentPercentage, setInvestmentPercentage] = useState<string>("0");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const checkValidateTab = (): boolean => {
    return firstTabInput.trim() !== "" && parseInt(firstTabInput, 10) > 0;
  };

  const handleValidationError = () => {
    setIsVisible(!checkValidateTab());
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); 
    setter(value.slice(0, 2)); 
  };
  const setDefault = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return () => {
      setter("");
    };
  };
  const handleComplete = async () => {
    const data = {
      total_amount: parseFloat(firstTabInput) || 0,
      released_amount: parseInt(releasedPercentage, 10) || 0,
      percent_invest: parseInt(investmentPercentage, 10) || 0,
    };
  
    console.log("Dados enviados ao servidor:", data);
  
    try {
      const res = await axios.post("http://localhost:8081/api/starthereregistevalue", data);
      console.log("Resposta do servidor:", res.data);
      alert("Valores atualizados com sucesso!");
      navigate("/");
    } catch (err) {
      console.error("Erro ao registrar valores:", err);
      alert("Erro ao registrar os valores. Tente novamente.");
    }
  };
  
  
  const handleNextClick = () => {
    handleValidationError(); 

  };
  return (
    <Body>
      <Section>
      <FormWizard onComplete={handleComplete}  color="#282B2F">
          <FormWizard.TabContent
            title="Registrar Conta"
            icon="fa fa-user"
          >
            <Column>
              <Title>Vamos começar registrando o valor da sua conta atual</Title>
              <Content>
                Por favor, insira o valor total disponível em sua conta para determinar quanto você pode gastar.
              </Content>
              <Label>
                Valor da Conta
                <span style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>*</span>
              </Label>
              <br />
              <StyledInput
                type="number"
                value={firstTabInput}
                onChange={(e) => setFirstTabInput(e.target.value)}
                onClick={() => {
                  setDefault(setFirstTabInput)();  
                  handleNextClick();
                }}
                placeholder="Digite o Valor da Conta"

              />
              <ErrorSpan visible={isVisible}>Por favor, insira um valor válido para a conta.</ErrorSpan>
            </Column>
          </FormWizard.TabContent>

          <FormWizard.TabContent
            title="Definir Valor Liberado"
            icon="fa fa-gear"
            isValid={checkValidateTab()}
          >
            <Column>
              <Title>Agora adicione quanto quer gastar por mês</Title>
              <Content>
                Você pode escolher uma porcentagem do valor total disponível em sua conta.
              </Content>
              <StyledInput
                type="number"
                value={releasedPercentage}
                onClick={setDefault(setReleasedPercentage)}
                onChange={handleInputChange(setReleasedPercentage)}
                placeholder="Porcentagem liberada"
              />
            </Column>
          </FormWizard.TabContent>

          <FormWizard.TabContent
            title="Investimentos"
            icon="fa fa-check"
          >
            <Column>
              <Title>Agora, adicione uma porcentagem que planeje investir no mês</Title>
              <Content>
                Certifique-se de que a soma das porcentagens liberada e investida não ultrapasse 100%.
              </Content>
              <StyledInput
                type="number"
                value={investmentPercentage}
                onClick={setDefault(setInvestmentPercentage)}

                onChange={handleInputChange(setInvestmentPercentage)}
                placeholder="Porcentagem de investimento"
              />
            </Column>
          </FormWizard.TabContent>
        </FormWizard>


        <style>
          {`
          @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");

          .react-form-wizard .wizard-icon-circle {
            background-color: #F5F5F5 !important;
            color: #343A40 !important;
            border: 1px solid #ddd;
          }

          .react-form-wizard .wizard-icon-circle.active {
            background-color: #282B2F !important;
            color: #FFFFFF !important;
          }

          .react-form-wizard {
            width: 100%;
            margin: 10px;
            padding-bottom: 20px;
          }

          .react-form-wizard .react-form-wizard-next {
            background-color: #282B2F !important;
            color: #fff !important;
          }

          .react-form-wizard .react-form-wizard-next:hover {
            background-color: #343A40 !important;
          }

          .smooth-border-left-to-right {
            position: relative;
            border-left: 2px solid transparent;
            transition: all 0.3s ease;
          }

          .smooth-border-left-to-right:hover {
            border-left: 2px solid #282B2F !important;
            border-color: #343A40;
          }

          .react-form-wizard .react-form-wizard-next:active {
            background-color: #1d1e22 !important;
          }

          .react-form-wizard .react-form-wizard-text {
            color: #000000 !important;
          }
                .wizard-btn {
      outline: none;
  border: none;
  height: 55px;
  background-color: #282B2F !important;
  color: #fff;
  font-size: 15px;
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
    }


          `}
        </style>
      </Section>
    </Body>
  );
};


export default StartHereForm;
