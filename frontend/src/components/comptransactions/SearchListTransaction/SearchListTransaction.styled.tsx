import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  justify-content:stretch;

`;

const GroupWelcome = styled.div`
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

const ModalLine = styled.div`
  width: 90%;
  border: solid #F1F1F1 0.8px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items:stretch;
  flex-direction: column;
  background-color: #FFFFFF;
  padding: 4%;
  border-radius: 8px;
`

const GroupLine = styled.div`
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
const Button = styled.button`
  outline: none;
  border: none;
  height: 55px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  margin-top:6%;
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
const StyledTable = styled.div`
  width: 100%;
  overflow-x: auto; /* Permite rolagem horizontal em telas pequenas */
  margin-top: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    text-align: left;
  }

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    text-align: center;
  }

  @media (max-width: 768px) {
    /* Para telas menores, ajuste a tabela */
    table {
      font-size: 0.9rem;
    }

    th,
    td {
      padding: 8px;
    }
  }
`;

const Searchbar = styled.div`
background-color:#f1f1f1;
height:35px;
border-radius: 4px;
border: solid 1px #D9D9D9;
margin-top:5%;
display:flex;
align-items:center;
padding-right:7%;
justify-content:flex-end;
margin-bottom:5%;
`

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

const TitleFormat = styled.h1`
  font-size: 1rem;
  color: #343A40;
  font-weight: 600;
  text-transform:capitalize;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


const Icon = styled.div`
background-color: #343A40;
width: 55px;
height: 55px;
display:flex;
justify-content:center;
align-items:center;
border-radius:4px;
`


interface PriceProps {
  type: "Despesa" | "Ganho";
}


const Price = styled.p<PriceProps>`
  color: ${(props) => (props.type === "Despesa" ? "red" : "green")};
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
const SepIcon = styled.div`
display:flex;
width:30%;
`

const SepPrice = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:60%;
flex-direction:column-reverse;
margin:0;
`

const Septext = styled.div`
display:flex;
width:100%;
margin-top:4%;
justify-content:flex-start;
flex-flow: column nowrap;

`
 const ModalOverlay = styled.div`
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
 const ModalContainer = styled.div`
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

// Título do Modal
const Text = styled.label`
color:#333B69;
font-size:0.95rem;
margin-top:4%;
margin-bottom: 1.5%;
`


// Estilo dos Inputs no Modal
 const Input = styled.input`
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

// Estilo do Select no Modal
 const Dropdown = styled.select`
  padding: 10px;
  margin: 5px 0;
  background-color:#F5F5F5;
  height:55px;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus{
    outline:none;
  }
`;

// Botão de Ação
 const ButtonEdit = styled.button`
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

// Botão de Cancelar
 const CancelButton = styled.button`
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

 const IconButton = styled.button`
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

// Estilo para inputs com erro
 const InputError = styled(Input)`
  border-color: #960707;
`;

// Mensagem de erro
 const ErrorMessage = styled.span`
  color: #960707;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const Row = styled.div`
display:flex;
gap:7px;
flex-flow: Row;
justify-content:flex-start;
padding:3%;
transition: all ease-in-out 0.2s;

&:hover{
    background-color:#e9e9e9c3;
    transform: scale(1.02);
    border-radius:4px;
}
`

const RowButtons = styled.div`
display:flex;
gap:17px;
flex-flow: Row;
justify-content:space-between;
padding:0%;
margin: 6% 0%;
transition: all ease-in-out 0.2s;
`

const Column = styled.div`
display:flex;
align-items:stretch;
width:100%;
flex-flow: column;
`
const Dateinfo = styled.p`
color: #718EBF;
font-size: 1.1rem;
font-weight: 400;
margin:0;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`
const Modal = styled.div`
    
`

export {
    Dateinfo,
    Modal,
    Column,
    Row,
    Septext,
    SepPrice,
    SepIcon,
    Price,
    Icon,
    Title,
    Button,
    Container,
    GroupLine,
    GroupWelcome,
    StyledTable,  
    ModalOverlay,
    ModalContainer,
    Input,
    Dropdown,
    ButtonEdit,
    CancelButton,
    Searchbar,
    IconButton,
    InputError,
    ErrorMessage,
    ModalLine,
    RowButtons,
    TitleFormat,
    Text
};