import styled from "styled-components";
const GroupWelcome = styled.div `
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
const GroupLine = styled.div `
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
const Title = styled.h1 `
  margin-top: 3%;
  font-size: 1.15rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
`;
const SectionForm = styled.section `
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form `
  width: 90%;
  max-width: 600px;
  padding: 10px;
  border-radius: 8px;
`;
const ContainerLabel = styled.div `
  display: flex;
  margin-top: 4%;
  margin-bottom: 10px;
  justify-content: flex-start;
`;
const Label = styled.label `
  color: #7A7A7A;
  font-size: 0.9rem;
  text-align: left;
  justify-content: flex-start;
`;
const InputBlock = styled.input `
  height: 55px;
  margin-bottom: 10px;
  width:80%;
  outline: none;
  border: solid 1px #D9D9D9;
  background: rgba(255, 255, 255, 0.2);
  color: #6F6F6F;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 5px;
`;
const Button = styled.button `
  outline: none;
  border: none;
  height: 59px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.5px;
  border-radius: 5px;
  font-weight: 600;
  padding-left: 15%;
  padding-right: 15%;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`;
const Dropdown = styled.select `
  height: 55px;
  border-radius: 5px;
  padding-left: 10px;
  border: solid 1px #D9D9D9;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: #6F6F6F;

  &:focus{
    outline:none;
  }
  
`;
const IconGroup = styled.div `
display:flex;
justify-content:center;
background-color:#343A40;
border-radius: 5px;
width:40%;
align-items: center;
`;
const Column = styled.div `
display:flex;
align-items:stretch;
align-self:stretch;
flex-flow:column nowrap;`;
const Row = styled.div `
display:flex;
align-items:stretch;
align-self:stretch;
gap:10px;
flex-flow:row nowrap;`;
const ErrorSpan = styled.span `
font-size: 14px;
color: #960707;
`;
const ApresentIcon = styled.span `
font-size: 20px;
color: #ffffff;
`;
export { GroupWelcome, GroupLine, Title, SectionForm, Form, ContainerLabel, Label, InputBlock, Button, Dropdown, IconGroup, Column, Row, ErrorSpan, ApresentIcon, };
