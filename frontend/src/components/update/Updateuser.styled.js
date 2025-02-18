import styled from "styled-components";
const GroupWelcome = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 7px;
  align-items: center;
  flex-direction: column;
  margin-top: 7%;
  margin-bottom: 7%;
  padding: 4%;
  border-radius: 8px;
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
  padding: 9%;
  border-radius: 8px;
`;
const ModalOverlay = styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro */
display: flex;
justify-content: center;
align-items: center;
z-index: 9999; /* Garante que o modal fique acima de outros elementos */
`;
// Container do modal
const ModalContainer = styled.div `
background-color: #fff;
padding: 15px;
border-radius: 4px;
width: 80%;
display: flex;
flex-direction: column;
align-items:stretch;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Sombras para o modal */
z-index: 10000; /* Garante que o conteúdo do modal fique sobreposto ao fundo */
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
const Input = styled.input `
padding: 10px;
margin: 5px 0;
background-color:#F5F5F5;
height:55px;
border: 1px solid #D9D9D9;
border-radius: 5px;
font-size: 1rem;
box-sizing: border-box; /* Faz com que o padding não afete o tamanho do elemento */
&:focus{
  outline:none;
}
`;
const ButtonEdit = styled.button `
outline: none;
border: none;
height: 55px;
background: #2B4731;
color: #fff;
font-size: 15px;
text-transform:capitalize;
border-radius: 5px;
font-weight:600;
cursor: pointer;
transition: 0.5s;
transition-property: border-left, border-right, box-shadow;

&:hover {
  box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
}
@media (max-width: 568px) {
font-size:0.9rem;
font-weight:600;
width:100%;
}
`;
const CancelButton = styled.button `
outline: none;
border: none;
height: 55px;
background: #9B2A26;
color: #fff;
font-size: 15px;
text-transform:capitalize;
border-radius: 5px;
font-weight:600;
cursor: pointer;
transition: 0.5s;
transition-property: border-left, border-right, box-shadow;

&:hover {
  box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
}
@media (max-width: 568px) {
  font-size:0.9rem;
  font-weight:600;
width:100%;
}
`;
const RowButtons = styled.div `
display:flex;
gap:17px;
flex-flow: Row;align-items:center;align-self:center;
justify-content:space-between;
padding:0%;
margin: 6% 0%;
transition: all ease-in-out 0.2s;
`;
const IconButton = styled.button `
outline: none;
border: none;
height: 55px;
background: #343A40;
color: #fff;
font-size: 15px;
border-radius: 5px;
text-transform:capitalize;
font-weight:600;
cursor: pointer;
transition: 0.5s;
transition-property: border-left, border-right, box-shadow;

&:hover {
  box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
}
@media (max-width: 568px) {
  font-size:0.9rem;
  font-weight:600; 
  width:100%;
}
`;
const Text = styled.label `
color:#333B69;
font-size:0.95rem;
margin-top:4%;
text-align:left;
margin-bottom: 1.5%;
`;
const Column = styled.div `
display:flex;
align-items:stretch;
width:100%;
flex-flow: column;
`;
const TogglePassword = styled.button `
  background: #282B2F;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.3s;
  padding:6.5%;
  border-radius:4px;
  margin-left:7%;
  
  &:hover {
    color: #2B4731; /* cor de hover */
  }

  &::before {
    content: url('path-to-icon'); /* Você pode usar um ícone aqui */
    display: inline-block;
  }

  @media (max-width: 568px) {
    font-size: 0.9rem;
  }
`;
export { GroupWelcome, GroupLine, ModalOverlay, ModalContainer, Title, Input, ButtonEdit, CancelButton, RowButtons, IconButton, Text, Column, TogglePassword };
