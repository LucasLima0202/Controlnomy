import styled from "styled-components";
import CenterIcon from "./CenterIcon";
import { faGear, faHouse, faList, faPlus, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { faCreditCardAlt } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const GroupWelcome = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
  margin-top: 7%;
  margin-bottom: 7%;
  padding: 4%;
  border-radius: 8px;
  box-shadow: rgba(201, 201, 201, 0.15) 0px 4px 16px, rgba(201, 201, 201, 0.15) 0px 8px 32px;
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* Habilita o snap para rolagem suave */
`;

const GroupLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6%;
  flex-direction: row;
  background-color: #ffffff;
  padding: 2%;

  border-radius: 8px;
  overflow-x: auto; /* Habilita rolagem horizontal */
`;

const SlideContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  gap:4%;

`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  padding-top:2%;
  width:20%;
  justify-content: center;
  flex-flow: column nowrap;
  min-width: 100px; /* Define a largura mínima uniforme */
  flex-shrink: 0; /* Impede que o conteúdo encolha */
  scroll-snap-align: center; /* Permite centralizar os itens ao deslizar */
`;

const Span = styled.span`
  text-align: center;
  font-size: 13px;
  padding-left:18%;
  padding-right:18%;
  margin-top: 6%;
  margin-bottom: 6%;
`;

const BoxAtalhos = () => {
  return (
    <>
      <GroupWelcome>
        <SlideContainer>
          <InfoIcon>
            <Link to="/Transactions">
            <CenterIcon icon={faPlus} />
            </Link>
            <Span>Adicionar Transação</Span>
          </InfoIcon>
          <InfoIcon>
          <Link to="/EditTransactions">
            <CenterIcon icon={faList} />
          </Link>
            <Span>Lista Transação</Span>
          </InfoIcon>
          <InfoIcon>
          <Link to="/StartHere">
            <CenterIcon icon={faScaleBalanced} />
            </Link>
            <Span>Personalizar Saldo</Span>
           
          </InfoIcon>
          <InfoIcon>
            <CenterIcon icon={faGear} />
            <Span>Configurações Gerais</Span>
          </InfoIcon>
        </SlideContainer>
      </GroupWelcome>
    </>
  );
};

export default BoxAtalhos;
