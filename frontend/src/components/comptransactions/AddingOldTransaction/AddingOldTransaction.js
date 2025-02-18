import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import useAddingTransactionDateValidation from "../../../hooks/AddTransactionDate";
import { CustomRadio, RadioLabel, RadioContainer, Dropdown, ContainerLabel, ErrorSpan, GroupLine, Button, GroupWelcome, StyledDatePicker, RadioInput, Title, Form, SectionForm, Row, Label, Input } from "./AddingOldTransaction.styled";
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};
const AddingOldTransaction = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [values, setValues] = useState({
        value: 0,
        type: false,
        category: "",
        description: "",
        date: "",
    });
    const [errors, setErrors] = useState({});
    const { validate } = useAddingTransactionDateValidation();
    const [categories, setCategories] = useState([]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: name === "value" ? parseFloat(value) : value,
        });
    };
    const handleRadioChange = (e) => {
        setValues({ ...values, type: e.target.value === "true" });
    };
    useEffect(() => {
        axios
            .get("http://localhost:8081/api/categories", getAuthHeaders())
            .then((response) => {
            setCategories(response.data);
        })
            .catch((error) => {
            console.error("Erro ao buscar categorias:", error);
        });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validação no frontend
        const formattedDate = startDate ? startDate.toISOString().slice(0, 10) : "";
        const validationErrors = validate({ ...values, date: formattedDate });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            // Envio de dados para o backend
            const response = await axios.post("http://localhost:8081/api/transactiondate", {
                ...values,
                date: formattedDate, // Inclui a data formatada
            }, getAuthHeaders());
            alert(response.data.message); // Mensagem de sucesso
            // Resetando os valores do formulário sem recarregar a página
            setValues({
                value: 0,
                type: false,
                category: "",
                description: "",
                date: "",
            });
            setStartDate(new Date()); // Reseta o componente de data
            setErrors({}); // Limpa os erros
        }
        catch (error) {
            console.error("Erro ao adicionar transação:", error.response?.data || error.message);
        }
    };
    return (_jsx(GroupWelcome, { children: _jsxs(GroupLine, { children: [_jsx(Title, { children: "Adicionar Transa\u00E7\u00E3o Passada" }), _jsx(SectionForm, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { children: "Escolha uma data" }) }), _jsx(StyledDatePicker, { selected: startDate, onChange: (date) => setStartDate(date), dateFormat: "dd/MM/yyyy" }), errors.date && _jsx(ErrorSpan, { children: errors.date })] }), _jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { id: "value", children: "Valor" }) }), _jsx(Input, { onChange: handleInput, type: "number", placeholder: "Digite o valor da transa\u00E7\u00E3o", name: "value", value: values.value || "" }), errors.value && _jsx(ErrorSpan, { children: errors.value })] }), _jsx(ContainerLabel, { children: _jsx(Label, { id: "type", children: "Tipo de Transa\u00E7\u00E3o" }) }), _jsxs(RadioContainer, { children: [_jsxs(RadioLabel, { children: [_jsx(RadioInput, { type: "radio", name: "type", value: "false", checked: !values.type, onChange: handleRadioChange }), _jsx(CustomRadio, {}), "Ganho"] }), _jsxs(RadioLabel, { children: [_jsx(RadioInput, { type: "radio", name: "type", value: "true", checked: values.type, onChange: handleRadioChange }), _jsx(CustomRadio, {}), "Despesa"] })] }), errors.type && _jsx(ErrorSpan, { children: errors.type }), _jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { id: "category", children: "Categoria" }) }), _jsxs(Dropdown, { onChange: handleInput, value: values.category, name: "category", children: [_jsx("option", { value: "", children: "Selecione a categoria" }), categories.map((category) => (_jsx("option", { value: category.id, children: category.name }, category.id)))] }), errors.category && _jsx(ErrorSpan, { children: errors.category })] }), _jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { id: "description", children: "Descri\u00E7\u00E3o" }) }), _jsx(Input, { onChange: handleInput, type: "text", placeholder: "Descri\u00E7\u00E3o da transa\u00E7\u00E3o", name: "description", value: values.description })] }), _jsx(Row, { children: _jsxs(Button, { type: "submit", children: [_jsx(FontAwesomeIcon, { icon: faPlus, color: "#FFFFFF", fontSize: 18 }), "\u3164Adicionar Transa\u00E7\u00E3o"] }) })] }) })] }) }));
};
export default AddingOldTransaction;
