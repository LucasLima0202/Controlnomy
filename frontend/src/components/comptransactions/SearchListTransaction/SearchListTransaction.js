import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball, faSmile, faImage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../../utils/formatnumber";
import { Dateinfo, Column, Row, Septext, RowButtons, Text, SepPrice, SepIcon, Searchbar, ModalLine, Price, Icon, Title, Container, GroupLine, GroupWelcome, ModalOverlay, ModalContainer, Input, Dropdown, ButtonEdit, CancelButton, IconButton, TitleFormat, } from "./SearchListTransaction.styled";
// Mapeamento de categorias e seus ícones
const categoryIconMapping = {
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
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};
const SearchListTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle de visibilidade do modal
    const [editedTransaction, setEditedTransaction] = useState(null); // Armazenar dados da transação para edição
    const [newValue, setNewValue] = useState("");
    const [newDescription, setNewDescription] = useState(""); // Defina aqui
    const [newType, setNewType] = useState(1); // 1 = Despesa, 2 = Ganho
    const [newCategoryId, setNewCategoryID] = useState("");
    useEffect(() => {
        const fetchTransactionsAndCategories = async () => {
            try {
                setLoading(true);
                const [transactionsResponse, categoriesResponse] = await Promise.all([
                    axios.get("http://localhost:8081/api/transactionslist", getAuthHeaders()),
                    axios.get("http://localhost:8081/api/categories", getAuthHeaders()),
                ]);
                setTransactions(transactionsResponse.data);
                setCategories(categoriesResponse.data);
            }
            catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTransactionsAndCategories();
    }, []);
    // Função para abrir o modal e carregar os dados da transação
    const handleRowClick = (transaction) => {
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
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!editedTransaction || !editedTransaction.id) {
            console.error("Erro: Transação inválida para edição.");
            alert("Erro: Transação inválida para edição.");
            return;
        }
        // Garantir que os valores não sejam null
        if (!newValue || !newDescription || !newCategoryId) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        // Criar o objeto correto para enviar para o backend
        const updatedTransaction = {
            amount: parseFloat(newValue), // Corrigido para "amount"
            description: newDescription,
            type: Number(newType), // Certificando que é um número
            category_id: Number(newCategoryId), // Corrigido para "category_id"
        };
        console.log("Enviando dados para a API:", updatedTransaction);
        try {
            await axios.put(`http://localhost:8081/api/transaction/${editedTransaction.id}`, updatedTransaction, getAuthHeaders() // Já inclui os headers corretamente
            );
            console.log("Transação atualizada com sucesso!");
            // Recarregar a lista de transações
            const response = await axios.get("http://localhost:8081/api/transactionslist", getAuthHeaders());
            setTransactions(response.data);
            handleCloseModal();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao atualizar transação:", error.response?.data || error.message);
                alert(`Erro ao atualizar transação: ${error.response?.data?.message || error.message}`);
            }
            else if (error instanceof Error) {
                console.error("Erro inesperado:", error.message);
                alert(`Erro inesperado: ${error.message}`);
            }
            else {
                console.error("Erro desconhecido:", error);
                alert("Ocorreu um erro inesperado.");
            }
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/transaction/${editedTransaction.id}`, getAuthHeaders());
            alert("Transação excluída com sucesso!");
            setIsModalOpen(false);
            setTransactions(transactions.filter(transaction => transaction.id !== editedTransaction.id));
        }
        catch (error) {
            console.error("Erro ao excluir transação:", error);
            alert("Falha ao excluir transação.");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(GroupWelcome, { children: _jsx(GroupLine, { children: _jsxs(Container, { children: [_jsx(Title, { children: "Pesquise por Transa\u00E7\u00F5es" }), _jsx(Column, { children: _jsx(Searchbar, { children: _jsx(FontAwesomeIcon, { icon: faSearch, fontSize: 18 }) }) }), transactions.map((transaction) => {
                                const formattedAmount = formatNumber(transaction.amount);
                                const category = categories.find((cat) => cat.id === transaction.category_id // Verifica se o ID da categoria corresponde ao da transação
                                );
                                const icon = category
                                    ? categoryIconMapping[category.icon] || faImage // Usa o nome da categoria para buscar o ícone
                                    : faSmile; // Se não encontrar categoria, exibe ícone padrão
                                return (_jsxs(Row, { onClick: () => handleRowClick(transaction), children: [_jsx(SepIcon, { children: _jsx(Icon, { children: _jsx(FontAwesomeIcon, { icon: icon, color: "#FFFFFF", fontSize: 18 }) }) }), _jsx(Septext, { children: _jsxs(Column, { children: [_jsx(TitleFormat, { children: transaction.description }), _jsx(Dateinfo, { children: new Date(transaction.date).toLocaleDateString() })] }) }), _jsx(SepPrice, { children: _jsxs(Price, { type: transaction.type === 0 ? "Ganho" : "Despesa", children: ["R$", formattedAmount] }) })] }, transaction.id));
                            })] }) }) }), isModalOpen && editedTransaction && (_jsx(ModalOverlay, { children: _jsx(ModalContainer, { children: _jsxs(ModalLine, { children: [_jsx(Title, { children: "Detalhes da Transa\u00E7\u00E3o" }), _jsxs("form", { onSubmit: handleEdit, children: [_jsxs(Column, { children: [_jsx(Text, { htmlFor: "description", children: "Nome" }), _jsx(Input, { type: "text", id: "description", value: newDescription, onChange: (e) => setNewDescription(e.target.value) })] }), _jsxs(Column, { children: [_jsx(Text, { htmlFor: "amount", children: "Valor" }), _jsx(Input, { type: "number", id: "amount", value: newValue, onChange: (e) => setNewValue(e.target.value) })] }), _jsxs(Column, { children: [_jsx(Text, { htmlFor: "type", children: "Tipo Transa\u00E7\u00E3o" }), _jsxs(Dropdown, { id: "type", value: newType, onChange: (e) => setNewType(Number(e.target.value)), children: [_jsx("option", { value: 1, children: "Despesa" }), _jsx("option", { value: 0, children: "Ganho" })] })] }), _jsxs(Column, { children: [_jsx(Text, { htmlFor: "date", children: "Data" }), _jsx(Input, { type: "date", id: "date", value: new Date(editedTransaction.date).toISOString().substring(0, 10), onChange: (e) => setEditedTransaction({ ...editedTransaction, date: e.target.value }) })] }), _jsxs(RowButtons, { children: [_jsx(ButtonEdit, { type: "submit", children: "Salvar" }), _jsx(CancelButton, { type: "button", onClick: handleDelete, children: "Excluir" }), _jsx(IconButton, { type: "button", onClick: handleCloseModal, children: "Cancelar" })] })] })] }) }) }))] }));
};
export default SearchListTransaction;
