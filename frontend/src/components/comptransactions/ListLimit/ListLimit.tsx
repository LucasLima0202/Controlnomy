import React, { useEffect, useState } from "react";
import axios from "axios";
import { faEdit, faQuestionCircle, faSmile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faPlus, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
  Dateinfo,
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
  TitleFormat,
} from "./ListLimit.styled"
import { formatNumber } from "../../../utils/formatnumber";



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



const ListLimit = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const fetchTransactionsAndCategories = async () => {
      try {
        setLoading(true);
        const [transactionsResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:8081/api/limit_transactionslist", headers),
          axios.get("http://localhost:8081/api/categories", headers),
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
        <Container id="list">
          {transactions.map((transaction) => {
            const formattedAmount = formatNumber(transaction.amount);
            const category = categories.find(
              (cat) => cat.id === transaction.category_id // Verifica se o ID da categoria corresponde ao da transação
            );

            const icon = category
              ? categoryIconMapping[category.icon] || faImage // Busca o ícone pelo nome da categoria
              : faSmile; // Se não encontrar categoria, exibe ícone padrão

            return (
              <Row key={transaction.id} >
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

        </Container>
      </GroupLine>
    </GroupWelcome>
  );
};

export default ListLimit;
