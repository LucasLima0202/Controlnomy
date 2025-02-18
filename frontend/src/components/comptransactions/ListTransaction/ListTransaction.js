import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import { faEdit, faSmile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Dateinfo, Column, Row, Septext, SepPrice, SepIcon, Price, Icon, Title, Button, Container, GroupLine, GroupWelcome, TitleFormat, } from "./ListTransaction.styled";
import { formatNumber } from "../../../utils/formatnumber";
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
const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
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
                    axios.get("http://localhost:8081/api/transactionslist", headers),
                    axios.get("http://localhost:8081/api/categories", headers),
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
    return (_jsx(GroupWelcome, { children: _jsx(GroupLine, { children: _jsxs(Container, { id: "list", children: [_jsx(Title, { children: "\u00DAltimas Transa\u00E7\u00F5es" }), transactions.map((transaction) => {
                        const formattedAmount = formatNumber(transaction.amount);
                        const category = categories.find((cat) => cat.id === transaction.category_id // Verifica se o ID da categoria corresponde ao da transação
                        );
                        const icon = category
                            ? categoryIconMapping[category.icon] || faImage // Busca o ícone pelo nome da categoria
                            : faSmile; // Se não encontrar categoria, exibe ícone padrão
                        return (_jsxs(Row, { children: [_jsx(SepIcon, { children: _jsx(Icon, { children: _jsx(FontAwesomeIcon, { icon: icon, color: "#FFFFFF", fontSize: 18 }) }) }), _jsx(Septext, { children: _jsxs(Column, { children: [_jsx(TitleFormat, { children: transaction.description }), _jsx(Dateinfo, { children: new Date(transaction.date).toLocaleDateString() })] }) }), _jsx(SepPrice, { children: _jsxs(Price, { type: transaction.type === 1 ? "Despesa" : "Ganho", children: ["R$", formattedAmount] }) })] }, transaction.id));
                    }), _jsx(Link, { to: "/EditTransactions", children: _jsxs(Button, { type: "submit", children: [_jsx(FontAwesomeIcon, { icon: faEdit, color: "#FFFFFF", fontSize: 18 }), "\u3164Editar Transa\u00E7\u00E3o"] }) })] }) }) }));
};
export default TransactionList;
