import styled from "styled-components";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrentDate } from "../../../utils/data";
import useAddingTransactionValidation from "../../../hooks/AddTransaction";
import axios from "axios";
import {
  GroupWelcome,
  GroupLine,
  Title,
  SectionForm,
  Form,
  ContainerLabel,
  Label,
  Input,
  Button,
  Dropdown,
  RadioContainer,
  RadioInput,
  CustomRadio,
  Row,
  ErrorSpan,
  RadioLabel,
  DateContent,
} from "./AddingTransaction.styled"


interface TransactionData {
  value: number;
  type: boolean;  // Agora é um booleano
  category: string;
  description: string;
}
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const AddingTransaction = () => {
  const [values, setValues] = useState<TransactionData>({
    value: 0,
    type: false,
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState<any>({});
  const { validate } = useAddingTransactionValidation();
  const [categories, setCategories] = useState<any[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === "value" ? parseFloat(value) : name === "category" ? parseInt(value) : value,
    });
  };
  

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, type: e.target.value === "true" });
  };
  

  useEffect(() => {
    axios.get("http://localhost:8081/api/categories",getAuthHeaders())
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    console.log("Valores enviados ao backend:", values);
  
    try {
      const response = await axios.post(
        "http://localhost:8081/api/transaction",
        {
          value: values.value,
          type: values.type, // Deve ser boolean: true ou false
          category: parseInt(values.category), // Converte categoria para número
          description: values.description,
        },
        getAuthHeaders()
      );
  
      alert(response.data.message);
  
      // Resetando os valores do formulário sem recarregar a página
      setValues({
        value: 0,
        type: false,
        category: "",
        description: "",
      });
      setErrors({});
  
    } catch (error: any) {
      console.error("Erro ao adicionar Transação:", error.response?.data || error.message);
    }
  };
  return (
    <GroupWelcome>
      <GroupLine>
        <Title>Adicionar Transação do Dia</Title>
        <DateContent>{getCurrentDate()}</DateContent>
        <SectionForm>
          <Form onSubmit={handleSubmit}>
            <Row>
              <ContainerLabel>
                <Label id="value">Valor</Label>
              </ContainerLabel>
              <Input
                onChange={handleInput}
                type="number"
                placeholder="Digite o valor da transação"
                name="value"
                value={values.value || ""}
              />
              {errors.value && <ErrorSpan>{errors.value}</ErrorSpan>}
            </Row>

            <ContainerLabel>
              <Label id="type">Tipo de Transação</Label>
            </ContainerLabel>
            <RadioContainer>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="type"
                  value="false"
                  checked={!values.type}
                  onChange={handleRadioChange}
                />
                <CustomRadio />
                Ganho
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="type"
                  value="true"
                  checked={values.type}
                  onChange={handleRadioChange}
                />
                <CustomRadio />
                Despesa
              </RadioLabel>
            </RadioContainer>
            {errors.type && <ErrorSpan>{errors.type}</ErrorSpan>}

            <Row>
              <ContainerLabel>
                <Label id="category">Categoria</Label>
              </ContainerLabel>
              <Dropdown
                onChange={handleInput}
                value={values.category}
                name="category"
              >
                <option value="">Selecione a categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Dropdown>
              {errors.category && <ErrorSpan>{errors.category}</ErrorSpan>}
            </Row>

            <Row>
              <ContainerLabel>
                <Label id="description">Descrição</Label>
              </ContainerLabel>
              <Input
                onChange={handleInput}
                type="text"
                placeholder="Descrição da transação"
                name="description"
                value={values.description}
              />
            </Row>

            <Row>
              <Button type="submit">
                <FontAwesomeIcon icon={faPlus} color="#FFFFFF" fontSize={18} />
                ㅤAdicionar Transação
              </Button>
            </Row>
          </Form>
        </SectionForm>
      </GroupLine>
    </GroupWelcome>
  );
};

export default AddingTransaction;
