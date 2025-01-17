import styled from "styled-components";
import Navbar from "../components/Navbar";

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

const StartHere = () => {
 

    return (
      <Body>
        <Navbar />
        <Section>
    
        </Section>
      </Body>
    );
  };
  
  export default StartHere;