import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball, faSmile, faQuestionCircle, faImage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../../utils/formatnumber";
import {
  Dateinfo,
  Column,
  Row,
  Septext,
  RowButtons,
  Text,
  SepPrice,
  SepIcon,
  Searchbar,
  ModalLine,
  Price,
  Icon,
  Title,
  Button,
  Modal,
  Container,
  GroupLine,
  GroupWelcome,
  ModalOverlay,
  ModalContainer,
  Input,
  Dropdown,
  ButtonEdit,
  CancelButton,
  IconButton,
  InputError,
  ErrorMessage,
  TitleFormat,
} from "./SearchListTransaction.styled";
import styled from "styled-components";

// Mapeamento de categorias e seus ícones
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

const SearchListTransaction = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle de visibilidade do modal
  const [editedTransaction, setEditedTransaction] = useState<any | null>(null); // Armazenar dados da transação para edição
  const [newValue, setNewValue] = useState("");
  const [newDescription, setNewDescription] = useState(""); // Defina aqui
  const [newType, setNewType] = useState(1); // 1 = Despesa, 2 = Ganho
  const [newCategoryId, setNewCategoryID] = useState("");

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

  // Função para abrir o modal e carregar os dados da transação
  const handleRowClick = (transaction: any) => {
    setEditedTransaction(transaction); // Carregar os dados da transação no modal
    setNewValue(transaction.amount); // Setar os valores iniciais para edição
    setNewDescription(transaction.description);
    setNewType(transaction.type); // Ajustando para tipo numérico (1 ou 2)
    setNewCategoryID(transaction.category_id); // Preencher com o ID da categoria
    setIsModalOpen(true); // Abrir o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Fechar o modal
  };

  // Função para editar a transação
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedTransaction = {
      value: newValue,
      description: newDescription,
      type: newType,  // 'Despesa' ou 'Ganho'
      category: newCategoryId,  // ID da categoria
    };
  
    axios.put(`http://localhost:8081/api/transaction/${editedTransaction.id}`, updatedTransaction)
      .then(response => {
        console.log("Transação atualizada com sucesso");
  
        // Recarregar a lista de transações após a atualização
        axios.get("http://localhost:8081/api/transactionslist")
          .then(response => {
            setTransactions(response.data); // Atualiza a lista com os dados mais recentes do servidor
            handleCloseModal(); // Fechar o modal
          })
          .catch(error => {
            console.error("Erro ao carregar as transações atualizadas:", error);
          });
      })
      .catch(error => {
        console.error("Erro ao atualizar transação:", error);
      });
  };
  
  // Função para excluir a transação
  const handleDelete = () => {
    axios.delete(`http://localhost:8081/api/transaction/${editedTransaction.id}`)
      .then(response => {
        alert("Transação excluída com sucesso!");
        setIsModalOpen(false); // Fechar o modal
        // Remover a transação da lista local
        setTransactions(transactions.filter(transaction => transaction.id !== editedTransaction.id));
      })
      .catch(error => {
        console.error("Erro ao excluir transação:", error);
        alert("Falha ao excluir transação.");
      });
  };

  return (
    <>
      <GroupWelcome>
        <GroupLine>
          <Container>
            <Title>Pesquise por Transações</Title>
            <Column>
            <Searchbar>
                <FontAwesomeIcon icon={faSearch} fontSize={18}/>
            </Searchbar>
            </Column>
            {transactions.map((transaction) => {
              const formattedAmount = formatNumber(transaction.amount);
              const category = categories.find(
                (cat) => cat.id === transaction.category_id // Verifica se o ID da categoria corresponde ao da transação
              );

              const icon = category
                ? categoryIconMapping[category.icon] || faImage // Usa o nome da categoria para buscar o ícone
                : faSmile; // Se não encontrar categoria, exibe ícone padrão

              return (
                <Row key={transaction.id} onClick={() => handleRowClick(transaction)}>
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

      {/* Modal */}
      {isModalOpen && editedTransaction && (
        <ModalOverlay>
          <ModalContainer>
            <ModalLine>
              <Title>Detalhes da Transação</Title>
              <form onSubmit={handleEdit}>
                {/* Descrição */}
                <Column>
                  <Text htmlFor="description">Nome</Text>
                  <Input
                    type="text"
                    id="description"
                    value={newDescription}
                    onChange={(e) =>
                      setNewDescription(e.target.value)
                    }
                  />
                </Column>

                {/* Valor */}
                <Column>
                  <Text htmlFor="amount">Valor</Text>
                  <Input
                    type="number"
                    id="amount"
                    value={newValue}
                    onChange={(e) =>
                      setNewValue(e.target.value)
                    }
                  />
                </Column>

                {/* Tipo */}
                <Column>
                  <Text htmlFor="type">Tipo Transação</Text>
                  <Dropdown
                    id="type"
                    value={newType}
                    onChange={(e) =>
                      setNewType(Number(e.target.value))
                    }
                  >
                    <option value={1}>Despesa</option>
                    <option value={2}>Ganho</option>
                  </Dropdown>
                </Column>

                {/* Data */}
                <Column>
                  <Text htmlFor="date">Data</Text>
                  <Input
                    type="date"
                    id="date"
                    value={new Date(editedTransaction.date).toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, date: e.target.value })
                    }
                  />
                </Column>

                {/* Botões */}
                <RowButtons>
                  <ButtonEdit type="submit">Salvar</ButtonEdit>
                  <CancelButton type="button" onClick={handleDelete}>Excluir</CancelButton>
                  <IconButton type="button" onClick={handleCloseModal}>Cancelar</IconButton>
                </RowButtons>
              </form>
            </ModalLine>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default SearchListTransaction;
