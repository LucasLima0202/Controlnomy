import { useEffect, useState } from "react";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faPlus, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import useAddingCategoryValidation from "../../../hooks/AddCategoryValidation";
import axios from "axios";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AddingCategory.styled"
import { ApresentIcon, ErrorSpan, Column, IconGroup, Dropdown, Button, InputBlock, Label, ContainerLabel, Form, SectionForm, Title, GroupLine, GroupWelcome, Row } from "./AddingCategory.styled"

const iconOptions = [
  { id: 1, name: "Alimentação", icon: faUtensils },
  { id: 2, name: "Assinatura", icon: faBell },
  { id: 3, name: "Compras", icon: faCartShopping },
  { id: 4, name: "Academia", icon: faDumbbell },
  { id: 5, name: "Vôlei", icon: faVolleyball },
  { id: 6, name: "Musica", icon: faMusic },
  { id: 7, name: "Proteção", icon: faShield },
  { id: 8, name: "Filme", icon: faFilm },
  { id: 9, name: "Contrato", icon: faHandshake },
  { id: 10, name: "Pagamento", icon: faUserMinus },
  { id: 11, name: "Recebimento", icon: faUserPlus },
  { id: 12, name: "Passeio", icon: faMountainSun },
  { id: 13, name: "Viagem", icon: faPassport },
  { id: 14, name: "Presente", icon: faHandHoldingHeart },
  { id: 15, name: "Outros", icon: faIcons },
];

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const AddingCategory = () => {

  const [values, setValues] = useState({
    name: "",
    typing: "",
    iconId: "",
  });
  const { validate, errors } = useAddingCategoryValidation();
  const [typings, setTypings] = useState<any[]>([]);
  const [errorMessages, setErrorMessages] = useState<any>({});

  useEffect(() => {
    axios.get("http://localhost:8081/api/typing",getAuthHeaders()) // Alterado para o endpoint correto
      .then((response) => {
        setTypings(response.data); // Atualiza o estado com os typings
      })
      .catch((error) => {
        console.error("Erro ao buscar os tipos de categoria", error);
      });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === "typing" ? parseInt(value) : value, // Converte "typing" para número
    });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(values);

    console.log("Valores enviados para o backend:", values);

    if (Object.keys(validationErrors).length === 0) {
        try {
            const iconName = iconOptions.find(icon => icon.id === parseInt(values.iconId))?.name || "defaultIcon"; 
            const response = await axios.post(
                "http://localhost:8081/api/addcategories",
                {
                    ...values,
                    icon: iconName, // Passando o nome do ícone e não o ID
                },
                getAuthHeaders()
            );

            alert(response.data.message);

            // Resetando os valores do formulário sem recarregar a página
            setValues({ name: "", typing: "", iconId: "" });
            setErrorMessages({}); // Limpa os erros

        } catch (error: any) {
            console.error("Erro ao adicionar categoria:", error.response?.data || error.message);
        }
    } else {
        setErrorMessages(validationErrors);
    }
};

  return (
    <GroupWelcome>
      <GroupLine>
        <Title>Adicionar Categoria</Title>

        <SectionForm>
          <Form onSubmit={handleSubmit}>
            <Column>
              <ContainerLabel>
                <Label id="name">Nome da Categoria</Label>
              </ContainerLabel>
              <Row>
                <InputBlock
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInput}
                  placeholder="Digite o nome da categoria"
                />
                <Button type="submit">
                  <FontAwesomeIcon icon={faPlus} color="#FFFFFF" fontSize={18} />
                </Button>
              </Row>
              {errorMessages.name && <ErrorSpan>{errorMessages.name}</ErrorSpan>}
            </Column>

            <Column>
              <Row>
                <ContainerLabel>
                  <Label id="type">Tipagem da Categoria</Label>
                </ContainerLabel>
              </Row>
              <Dropdown name="typing" value={values.typing} onChange={handleInput}>
                <option value="">Selecione o Tipo da Categoria</option>
                {typings.map((typing: any) => (
                  <option key={typing.id} value={typing.id}>
                    {typing.name}
                  </option>
                ))}
              </Dropdown>

              {errorMessages.typing && <ErrorSpan>{errorMessages.typing}</ErrorSpan>}
            </Column>

            <Column>
              <Row>
                <ContainerLabel>
                  <Label id="type">Icone da Categoria</Label>
                </ContainerLabel>
              </Row>
              <Row>

              <Dropdown name="iconId" value={values.iconId} onChange={handleInput}>
            <option value="">Selecione um Ícone</option>
            {iconOptions.map((icon) => (
              <option key={icon.id} value={icon.id}>
                {icon.name}
              </option>
            ))}
          </Dropdown>
          <IconGroup>

          <ApresentIcon>
            {values.iconId && (
              <FontAwesomeIcon
                icon={iconOptions.find((icon) => icon.id === parseInt(values.iconId))?.icon || faSmile}
              />
            )}
          </ApresentIcon>
          </IconGroup>
              </Row>

              {errorMessages.typing && <ErrorSpan>{errorMessages.typing}</ErrorSpan>}
            </Column>
          </Form>
        </SectionForm>
      </GroupLine>
    </GroupWelcome>
  );
};

export default AddingCategory;
