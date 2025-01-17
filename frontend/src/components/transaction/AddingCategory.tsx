import styled from "styled-components";
import { useEffect, useState } from "react";
import { faBell, faCartShopping, faDumbbell, faFilm, faHandHoldingHeart, faHandshake, faIcons, faMountainSun, faMusic, faPassport, faPlus, faShield, faUserMinus, faUserPlus, faUtensils, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import useAddingCategoryValidation from "../../hooks/AddCategoryValidation";
import axios from "axios";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
const Title = styled.h1`
  margin-top: 3%;
  font-size: 1.15rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
`;
const SectionForm = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  width: 90%;
  max-width: 600px;
  padding: 10px;
  border-radius: 8px;
`;
const ContainerLabel = styled.div`
  display: flex;
  margin-top: 4%;
  margin-bottom: 10px;
  justify-content: flex-start;
`;
const Label = styled.label`
  color: #7A7A7A;
  font-size: 0.9rem;
  text-align: left;
  justify-content: flex-start;
`;
const InputBlock = styled.input`
  height: 55px;
  margin-bottom: 10px;
  width:80%;
  outline: none;
  border: solid 1px #D9D9D9;
  background: rgba(255, 255, 255, 0.2);
  color: #6F6F6F;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 5px;
`;
const Button = styled.button`
  outline: none;
  border: none;
  height: 59px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.5px;
  border-radius: 5px;
  font-weight: 600;
  padding-left: 15%;
  padding-right: 15%;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`;
const Dropdown = styled.select`
  height: 55px;
  border-radius: 5px;
  padding-left: 10px;
  border: solid 1px #D9D9D9;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: #6F6F6F;

  &:focus{
    outline:none;
  }
  
`;
const IconGroup = styled.div`
display:flex;
justify-content:center;
background-color:#343A40;
border-radius: 5px;
width:40%;
align-items: center;
`;

const Column = styled.div`
display:flex;
align-items:stretch;
align-self:stretch;
flex-flow:column nowrap;`
const Row = styled.div`
display:flex;
align-items:stretch;
align-self:stretch;
gap:10px;
flex-flow:row nowrap;`

const ErrorSpan = styled.span`
font-size: 14px;
color: #960707;
`


const ApresentIcon = styled.span`
font-size: 20px;
color: #ffffff;
`

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
    axios.get("http://localhost:8081/api/typing") // Alterado para o endpoint correto
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
        const iconName = iconOptions.find(icon => icon.id === parseInt(values.iconId))?.name || "defaultIcon"; // Ajuste para pegar o nome do ícone
        const response = await axios.post("http://localhost:8081/api/addcategories", {
          ...values,
          icon: iconName,  // Passando o nome do ícone e não o ID
        });
        alert(response.data.message);
  
        // Reseta os valores do formulário
        setValues({ name: "", typing: "", iconId: "" });  
        // Recarrega a página
        window.location.reload();
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
