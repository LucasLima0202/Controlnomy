import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import animationEdit from "../assets/lotties/Entrace.json";
import Lottie from "react-lottie";
// Configuração do Lottie
const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationEdit,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
// Animação da barra de progresso
const progressAnimation = keyframes `
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;
const Body = styled.div `
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: #282b2f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
const LogoWrapper = styled.div `
  margin-bottom: 9%;
`;
const Logo = styled.img `
  width: 90px;
  height: 90px;
`;
const CountdownWrapper = styled.div `
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  background: rgba(25, 24, 24, 0.807);
  overflow: hidden;
  font-size: 3rem;
  font-family: Arial, sans-serif;
  color: #fff;
  margin: 20px 0;
`;
const CountdownNumber = styled.div `
  font-size: 3rem;
  font-weight: bold;
`;
const ProgressBarContainer = styled.div `
  width: 100%;
  max-width: 300px;
  height: 10px;
  background-color: #444;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;
const ProgressBar = styled.div `
  height: 100%;
  background-color: #ffbb38;
  border-radius: 5px;
  animation: ${progressAnimation} ${({ duration }) => duration}s linear forwards;
`;
const TextWrapper = styled.div `
  text-align: center;
  margin-top: 9%;
  margin-bottom: 15%;
`;
const Title = styled.h1 `
  font-size: 1.2rem;
  line-height: 32px;
  color: #ffffff;
  margin-bottom: 10px;
`;
const Content = styled.p `
  font-size: 1rem;
  color: #ffffff;
  margin-top: 19px;
  line-height: 1.5;
`;
const CustomLink = styled(Link) `
  color: #ffbb38;
  text-decoration: underline;
`;
const Initialization = () => {
    const [count, setCount] = useState(5); // Tempo inicial (em segundos)
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev > 0)
                    return prev - 1;
                clearInterval(timer);
                navigate("/login"); // Redireciona após o tempo acabar
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer); // Cleanup do intervalo
    }, [navigate]);
    return (_jsx(Body, { children: _jsx(Lottie, { options: defaultOptions }) }));
};
export default Initialization;
