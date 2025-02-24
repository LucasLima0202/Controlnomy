import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartArea, faChevronDown, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Updateuser from "../components/update/Updateuser";
import Lottie from "react-lottie";
import animationEdit from "../assets/lotties/construction.json"
import { Link } from "react-router-dom";


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationEdit,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


const Body = styled.div`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  background-color: #323539;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #343A40;
`;

const FaqContainer = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #282B2F;
  :hover{
    background-color:#e9ecef;
  }
  
  @media (max-width: 480px) {
    max-width: 90%;
  }
`;
const LogoWrapper = styled.div`
  margin-bottom: 14%;
  margin-top:25%;
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
`;
const FaqItem = styled.div`
  border-bottom: 1px solid #e9ecef;
  font-size: 1.15rem;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  :last-child {
    border-bottom: none;
  }
`;

const FaqQuestion = styled.div`
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
  font-family: "Inter", serif;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #282B2F;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
    color:#282B2F;
    svg{
        color:#282B2F;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 15px;
  }
`;

const FaqAnswer = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "700px" : "0")};
  overflow: hidden;
  padding: ${({ isOpen }) => (isOpen ? "15px 20px" : "0 20px")};
  background-color: #ffffff;
  margin-top: 3%;
  font-size: 1.15rem;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  line-height: 1.6;
  transition: max-height 0.3s ease, padding 0.3s ease;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Arrow = styled.div<{ isOpen: boolean }>`
  font-size: 18px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;
const Title = styled.h1`
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
const Content = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #4b4b4b;
  line-height:30px;
  margin-top:5%;
  font-weight:500;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Center = styled.div`
display:flex;
align-items:center;
justify-content:center;
`

const faqData = [
  {
    question: (
        <>
          <FontAwesomeIcon icon={faUser} color="#ffffff"/> Account
        </>
      ),
    answer: (
        <Center>
            <Updateuser/>
        </Center>
    ),
  },
  {
    question: (
        <>
          <FontAwesomeIcon icon={faBell} color="#ffffff"/> Notifications
        </>
      ),
    answer: (
        <Center>
         <Lottie  options={defaultOptions} height={170} width={380}/>
        </Center>
    ),
  },
  {
    question: (
        <>
          <FontAwesomeIcon icon={faChartArea} color="#ffffff"/> Dashboard
        </>
      ),
    answer: (
        <>       
        <Link to="/dashboard" >

            <Button fontsize="0.8rem">
                             IR PARA O DASHBOARD 
            </Button>
        </Link>
        </>
    ),
  },
];

const SettingsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index : any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Body>
       <LogoWrapper>
        <Link to="/dashboard" >
        <Logo src="/svg/LogoBl.svg" alt="Logo" />
        </Link>
      </LogoWrapper>
      <FaqContainer>
        {faqData.map((item, index) => (
          <FaqItem key={index}>
            <FaqQuestion onClick={() => toggleFAQ(index)}>
              {item.question}
              <Arrow isOpen={openIndex === index}>
                <FontAwesomeIcon icon={faChevronDown} />
              </Arrow>
            </FaqQuestion>
            <FaqAnswer isOpen={openIndex === index}>{item.answer}</FaqAnswer>
          </FaqItem>
        ))}
      </FaqContainer>
    </Body>
  );
};

export default SettingsPage;
