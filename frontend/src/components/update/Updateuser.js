import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { GroupWelcome, GroupLine, ModalOverlay, ModalContainer, Title, Input, ButtonEdit, CancelButton, RowButtons, Column, Text, TogglePassword } from "./Updateuser.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Updateuser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // Carregar os dados do usuário ao abrir o componente
    useEffect(() => {
        axios.get("http://localhost:8081/api/getuser")
            .then(response => {
            if (response.data) {
                setUserData(response.data);
                setName(response.data.name || "");
                setEmail(response.data.email || "");
                setPassword(response.data.password || "");
            }
        })
            .catch(error => {
            console.error("Erro ao buscar os dados do usuário:", error);
        });
    }, []);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleUpdate = async (e) => {
        e.preventDefault();
        // Criando um objeto de atualização apenas com os valores modificados
        const updatedData = {
            new_name: name !== userData.name ? name : userData.name,
            new_email: email !== userData.email ? email : userData.email,
            new_password: password !== userData.password ? password : userData.password,
        };
        try {
            await axios.post("http://localhost:8081/api/alteregister", updatedData);
            alert("Usuário atualizado com sucesso!");
            // Atualiza apenas os valores modificados no estado userData
            setUserData((prevData) => ({
                ...prevData,
                name: updatedData.new_name,
                email: updatedData.new_email,
                password: updatedData.new_password,
            }));
            handleCloseModal();
        }
        catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário.");
        }
    };
    return (_jsxs(GroupWelcome, { children: [_jsxs(GroupLine, { children: [_jsxs(Column, { children: [_jsx(Text, { children: "Nome" }), _jsx(Input, { type: "text", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs(Column, { children: [_jsx(Text, { children: "Email" }), _jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs(Column, { children: [_jsx(Text, { children: "Senha" }), _jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx(Input, { type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx(TogglePassword, { onClick: () => setShowPassword(!showPassword), children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEye }) })] })] }), _jsx(ButtonEdit, { onClick: handleOpenModal, children: "Alterar Informa\u00E7\u00F5es" })] }), isModalOpen && (_jsx(ModalOverlay, { children: _jsxs(ModalContainer, { children: [_jsx(Title, { children: "Atualizar Informa\u00E7\u00F5es" }), _jsxs("form", { onSubmit: handleUpdate, children: [_jsxs(Column, { children: [_jsx(Text, { children: "Nome" }), _jsx(Input, { type: "text", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs(Column, { children: [_jsx(Text, { children: "Email" }), _jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs(Column, { children: [_jsx(Text, { children: "Senha" }), _jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx(Input, { type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx(TogglePassword, { onClick: () => setShowPassword(!showPassword), children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEye }) })] })] }), _jsxs(RowButtons, { children: [_jsx(ButtonEdit, { type: "submit", children: "Salvar" }), _jsx(CancelButton, { type: "button", onClick: handleCloseModal, children: "Cancelar" })] })] })] }) }))] }));
};
export default Updateuser;
