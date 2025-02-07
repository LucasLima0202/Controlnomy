import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GroupWelcome,
  GroupLine,
  ModalOverlay,
  ModalContainer,
  Title,
  Input,
  ButtonEdit,
  CancelButton,
  RowButtons,
  Column,
  Text,
  TogglePassword
} from "./Updateuser.styled";
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
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário.");
    }
  };

  return (
    <GroupWelcome>
      <GroupLine>
        <Column>
          <Text>Nome</Text>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Column>
        <Column>
          <Text>Email</Text>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Column>
        <Column>
          <Text>Senha</Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </TogglePassword>
          </div>
        </Column>
        <ButtonEdit onClick={handleOpenModal}>Alterar Informações</ButtonEdit>
      </GroupLine>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <Title>Atualizar Informações</Title>
            <form onSubmit={handleUpdate}>
              <Column>
                <Text>Nome</Text>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </Column>
              <Column>
                <Text>Email</Text>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Column>
              <Column>
                <Text>Senha</Text>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </TogglePassword>
                </div>
              </Column>

              <RowButtons>
                <ButtonEdit type="submit">Salvar</ButtonEdit>
                <CancelButton type="button" onClick={handleCloseModal}>Cancelar</CancelButton>
              </RowButtons>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </GroupWelcome>
  );
};

export default Updateuser;
