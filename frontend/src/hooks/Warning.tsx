import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  margin-bottom: 3%;
`;

const Button = styled.button`
  outline: none;
  border: none;
  font-weight:600;
  width: 49%;
  height: 65px;
  background: #DDAB06;
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 5%;
  margin-top:4%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  @media (max-width: 668px) {
    font-size: 0.9rem;
    width: 80%;
  }

  &:hover {
   
    box-shadow: 0 0 30px rgba(131, 131, 131, 0.278);
  }
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #282B2F;

`;

const Content = styled.div`
display: flex;
align-items:center;   
align-self: center;
flex-flow: column;
`

const Title = styled.p`
color: #FFFFFF;
font-size: 2rem;
line-height: 150%;
font-weight:600;
width:80%;
text-align: center;

@media (max-width: 668px) {
    font-size: 1.59rem;
    line-height: 180%;
    width: 80%;
  }
`

const BlurredEllipseLeft = styled.div`
  position: absolute;
  left: 80%;
  width: 300px; /* Ajuste conforme necessário */
  height: 300px;
  background-color: #535353;
  border-radius: 50%;
  opacity: 0.4;
  filter: blur(40px);
`;

const BlurredEllipseRight = styled.div`
  position: absolute;
  width: 300px; /* Ajuste conforme necessário */
  height: 300px;
  border-radius: 50%;
  opacity: 0.4;
  filter: blur(80px);
`;

interface WarningProps {
  onConfirm: () => void;
}

const Warning: React.FC<WarningProps> = ({ onConfirm }) => {
  return (
    <Background >

      <Content>
      <LogoWrapper>
        <Logo src="/svg/LogoBl.svg" alt="Logo" />
      </LogoWrapper>
        <Title>🚀 Este site foi feito para dispositivos móveis! Para aproveitar ao máximo, acesse pelo seu celular.</Title>
        <Button onClick={onConfirm} >
          Continuar Mesmo Assim
        </Button>
      </Content>
    </Background>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Warning;
