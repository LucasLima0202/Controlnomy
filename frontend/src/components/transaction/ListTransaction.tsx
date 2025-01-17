import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { faEdit, faQuestionCircle, faSmile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatnumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faPlus, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";




const categoryIconMapping: { [key: string]: any } = {
  "Alimentação": faUtensils,
  "Assinatura": faBell,
  "Compras": faCartShopping,
  "Academia": faDumbbell,
  "Vôlei": faVolleyball,
  "Musica": faMusic,
  "Proteção": faShield,
  "Filme": faFilm,
  "Contrato": faHandshake,
  "Pagamento": faUserMinus,
  "Recebimento": faUserPlus,
  "Passeio": faMountainSun,
  "Viagem": faPassport,
  "Presente": faHandHoldingHeart,
  "Outros": faIcons,
};


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

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
  margin-bottom: 1rem;

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
const Price = styled.p`
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

const Row = styled.div`
display:flex;
gap:7px;
flex-flow: Row;
justify-content:flex-start;
padding:3%;
`
const Column = styled.div`
display:flex;
align-items:flex-start;
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

const TransactionList = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionsAndCategories = async () => {
      try {
        setLoading(true);
        const [transactionsResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:8081/api/transactionslist"),
          axios.get("http://localhost:8081/api/categories"),
        ]);
        setTransactions(transactionsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionsAndCategories();
  }, []);

  return (
    <GroupWelcome>
      <GroupLine>
        <Container>
          <Title>Últimas Transações</Title>
          {transactions.map((transaction) => {
            const formattedAmount = formatNumber(transaction.amount);
            const category = categories.find(
              (cat) => cat.id === transaction.category_id // Verifica se o ID da categoria corresponde ao da transação
            );

            const icon = category
              ? categoryIconMapping[category.icon] || faImage // Busca o ícone pelo nome da categoria
              : faSmile; // Se não encontrar categoria, exibe ícone padrão

            return (
              <Row key={transaction.id}>
                <SepIcon>
                  <Icon>
                    <FontAwesomeIcon
                      icon={icon} // Usa o ícone mapeado
                      color="#FFFFFF"
                      fontSize={18}
                    />
                  </Icon>
                </SepIcon>
                <Septext>
                  <Column>
                    <TitleFormat>{transaction.description}</TitleFormat>
                    <Dateinfo>{new Date(transaction.date).toLocaleDateString()}</Dateinfo>
                  </Column>
                </Septext>
                <SepPrice>
                  <Price type={transaction.type === 1 ? "Despesa" : "Ganho"}>
                    R${formattedAmount}
                  </Price>
                </SepPrice>
              </Row>
            );
          })}
          <Link to={"/EditTransactions"}>
            <Button type="submit">
              <FontAwesomeIcon icon={faEdit} color="#FFFFFF" fontSize={18} />
              ㅤEditar Transação
            </Button>
          </Link>
        </Container>
      </GroupLine>
    </GroupWelcome>
  );
};

export default TransactionList;
