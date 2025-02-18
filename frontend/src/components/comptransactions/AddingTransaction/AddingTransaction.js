import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrentDate } from "../../../utils/data";
import useAddingTransactionValidation from "../../../hooks/AddTransaction";
import axios from "axios";
import { GroupWelcome, GroupLine, Title, SectionForm, Form, ContainerLabel, Label, Input, Button, Dropdown, RadioContainer, RadioInput, CustomRadio, Row, ErrorSpan, RadioLabel, DateContent, } from "./AddingTransaction.styled";
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};
const AddingTransaction = () => {
    const [values, setValues] = useState({
        value: 0,
        type: false,
        category: "",
        description: "",
    });
    const [errors, setErrors] = useState({});
    const { validate } = useAddingTransactionValidation();
    const [categories, setCategories] = useState([]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: name === "value" ? parseFloat(value) : name === "category" ? parseInt(value) : value,
        });
    };
    const handleRadioChange = (e) => {
        setValues({ ...values, type: e.target.value === "true" });
    };
    useEffect(() => {
        axios.get("http://localhost:8081/api/categories", getAuthHeaders())
            .then((response) => {
            setCategories(response.data);
        })
            .catch((error) => {
            console.error("Erro ao buscar categorias:", error);
        });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Valores enviados ao backend:", values);
        try {
            const response = await axios.post("http://localhost:8081/api/transaction", {
                value: values.value,
                type: values.type, // Deve ser boolean: true ou false
                category: parseInt(values.category), // Converte categoria para número
                description: values.description,
            }, getAuthHeaders());
            alert(response.data.message);
            // Resetando os valores do formulário sem recarregar a página
            setValues({
                value: 0,
                type: false,
                category: "",
                description: "",
            });
            setErrors({});
        }
        catch (error) {
            console.error("Erro ao adicionar Transação:", error.response?.data || error.message);
        }
    };
    return (_jsx(GroupWelcome, { children: _jsxs(GroupLine, { children: [_jsx(Title, { children: "Adicionar Transa\u00E7\u00E3o do Dia" }), _jsx(DateContent, { children: getCurrentDate() }), _jsx(SectionForm, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { id: "value", children: "Valor" }) }), _jsx(Input, { onChange: handleInput, type: "number", placeholder: "Digite o valor da transa\u00E7\u00E3o", name: "value", value: values.value || "" }), errors.value && _jsx(ErrorSpan, { children: errors.value })] }), _jsx(ContainerLabel, { children: _jsx(Label, { id: "type", children: "Tipo de Transa\u00E7\u00E3o" }) }), _jsxs(RadioContainer, { children: [_jsxs(RadioLabel, { children: [_jsx(RadioInput, { type: "radio", name: "type", value: "false", checked: !values.type, onChange: handleRadioChange }), _jsx(CustomRadio, {}), "Ganho"] }), _jsxs(RadioLabel, { children: [_jsx(RadioInput, { type: "radio", name: "type", value: "true", checked: values.type, onChange: handleRadioChange }), _jsx(CustomRadio, {}), "Despesa"] })] }), errors.type && _jsx(ErrorSpan, { children: errors.type }), _jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { id: "category", children: "Categoria" }) }), _jsxs(Dropdown, { onChange: handleInput, value: values.category, name: "category", children: [_jsx("option", { value: "", children: "Selecione a categoria" }), categories.map((category) => (_jsx("option", { value: category.id, children: category.name }, category.id)))] }), errors.category && _jsx(ErrorSpan, { children: errors.category })] }), _jsxs(Row, { children: [_jsx(ContainerLabel, { children: _jsx(Label, { id: "description", children: "Descri\u00E7\u00E3o" }) }), _jsx(Input, { onChange: handleInput, type: "text", placeholder: "Descri\u00E7\u00E3o da transa\u00E7\u00E3o", name: "description", value: values.description })] }), _jsx(Row, { children: _jsxs(Button, { type: "submit", children: [_jsx(FontAwesomeIcon, { icon: faPlus, color: "#FFFFFF", fontSize: 18 }), "\u3164Adicionar Transa\u00E7\u00E3o"] }) })] }) })] }) }));
};
export default AddingTransaction;
