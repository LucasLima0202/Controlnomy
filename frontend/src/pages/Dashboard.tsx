import styled from "styled-components";
import Navbarui from "../components/Navbar";
import { getCurrentDate } from "../utils/data"; // Ajuste o caminho conforme necessário
import Lottie from "react-lottie";
import animationData from "../assets/lotties/welcome.json"
import { Link, useNavigate } from "react-router-dom";
import BoxInsight from "../components/BoxHotkey";
import BoxAtalhos from "../components/BoxHotkey";
import BoxGlobal from "../components/BoxGlobal";
// import { Link } from 'react-scroll';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const Button = styled.button`
  outline: none;
  border: none;
  height: 55px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  margin-top:4%;
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

const Row = styled.div`
display:flex;
align-items:stretch;
align-self:stretch;
flex-flow:column nowrap;`

const BodyGroup = styled.div`
  width: 100%;
  margin:0;
  box-sizing: border-box;
  background-color: #F5F5F5;
  padding-top: 20px; /* Espaço reservado para a Navbar */
  min-height: 100vh; /* Garante que o conteúdo ocupe toda a altura da tela */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #343A40;
`;

const WholeSite = styled.div`
  width: 100%;
  margin:0;
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

const Title = styled.h1`
  margin-top:6%;
  font-size: 1.5rem;
  color:#343A40;
  font-weight:600;
  margin-bottom: 20px;
`;

const Content = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
  margin-bottom: 1%;
  margin-top:1%;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const SmallContent = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #4b4b4b;
  line-height:30px;
  margin-top:1%;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const DateContent = styled.div`
font-size: 1rem;
padding-top:1%;
margin-bottom:2%;
text-align: center;
margin-bottom: 5px;
color:#777777;
`

const GroupWelcome = styled.div`
width:80%;
display:flex;
justify-content:center;
gap:7px;
align-items:center;
flex-direction:column;
background-color:#FFFFFF;
padding: 4%;
border-radius: 8px;
box-shadow:  rgba(201, 201, 201, 0.15) 0px 4px 16px, rgba(201, 201, 201, 0.15) 0px 8px 32px;
`

const GroupLine = styled.div`
width:90%;
border: solid #F1F1F1 0.8px;
display:flex;
justify-content:center;
gap:7px;
align-content:center;
align-items:center;
flex-direction:column;
background-color:#FFFFFF;
padding: 4%;
border-radius: 8px;
`
const Elipse = styled.div`
  background: #ffdd7f65;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px; /* Aumentado para acomodar o Lottie */
  height: 100px; /* Deve ser igual à largura para manter o formato */
`;

const Strecht = styled.div`
display:flex;
width:100%;
align-items: stretch;
`


const Dashboard = () => {
  const navigate = useNavigate();


    return (
      <WholeSite>
        <Navbarui />
        <BodyGroup>
          <Title>Bem-vindo ao Dashboard</Title>
  
          <GroupWelcome>
            <GroupLine>
              <DateContent>
                {new Date().toLocaleString("pt-BR", { month: "long" })} -{" "}
                {getCurrentDate()}
              </DateContent>
              <Elipse>
                <Lottie options={defaultOptions} height={120} width={80} />
              </Elipse>
              <Content>Aqui está o conteúdo do seu Dashboard.</Content>
              <SmallContent>
                Para começarmos a monitorar insira os dados da sua renda
              </SmallContent>
              <Row>
                <Link to={'/Starthere'}>
                            <Button >
                                ㅤAdicionar Transação
                            </Button>
                </Link>
              </Row>
            </GroupLine>
          </GroupWelcome>


          <BoxAtalhos/>
          <BoxGlobal/>


        </BodyGroup>
      </WholeSite>
    );
  };
  
  export default Dashboard;
