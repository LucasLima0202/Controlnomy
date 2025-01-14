import styled from "styled-components";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrentDate } from "../../utils/data";

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
  margin-top: 6%;
  font-size: 1.15rem;
  text-align: center;
  color: #343A40;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DateContent = styled.div`
  font-size: 1rem;
  padding-top: 1%;
  margin-bottom: 2%;
  text-align: center;
  color: #777777;
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
  padding: 20px;
  border-radius: 8px;
`;

const ContainerLabel = styled.div`
  display: flex;
  margin-top:4%;
  margin-bottom: 10px;
  justify-content: flex-start;
`;

const Label = styled.label`
  color: #7A7A7A;
  font-size: 0.9rem;
  text-align: left;
  justify-content: flex-start;
`;

const Input = styled.input`
  height: 55px;
  margin-bottom: 10px;
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
  height: 55px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  margin-top:4%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  font-weight:600;
  padding-left:5%;
  padding-right:5%;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`;

const ErrorSpan = styled.span`
  color: #960707;
`;

const Dropdown = styled.select`
  height: 55px;
  border-radius: 5px;
  padding-left: 10px;
  border: solid 1px #D9D9D9;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: #6F6F6F;
  
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:5%;
  margin-bottom:5%;
  gap: 20px;
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #343a40;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const RadioInput = styled.input`
  display: none;
`;

const CustomRadio = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #D9D9D9;
  display: inline-block;
  margin-right: 10px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  left: 0;

  /* Quando o radio está checado, altera o estilo */
  ${RadioInput}:checked + & {
    background-color: #FFBB38;
    border-color: #FFBB38;
  }

  ${RadioInput}:checked + &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const Row = styled.div`
display:flex;
align-items:stretch;
align-self:stretch;
flex-flow:column nowrap;`

const AddindTransaction = () => {

    const [values, setValues] = useState({
        value: "",
        type: "GAIN",
        category: "",
        description: "",
      });
      const [errors, setErrors] = useState({});
      const [categories, setCategories] = useState([]); // Categoria vem do banco de dados
    
      const handleInput = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
    
      const handleRadioChange = (event: any) => {
        setValues({ ...values, type: event.target.value });
      };
    
      const handleCategoryChange = (event: any) => {
        setValues({ ...values, category: event.target.value });
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        // Validação pode ser feita aqui
        if (!values.value || !values.type || !values.category || !values.description) {
          setErrors({ message: "Todos os campos são obrigatórios." });
        } else {
          // Enviar os dados para o backend aqui
          console.log("Enviando dados: ", values);
        }
      };
    return(
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
              />
              </Row>

              <ContainerLabel>
                <Label id="type">Tipo de Transação</Label>
              </ContainerLabel>
              <RadioContainer>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="type"
            value="GAIN"
            checked={values.type === "GAIN"}
            onChange={handleRadioChange}
          />
          <CustomRadio />
          Ganho
        </RadioLabel>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="type"
            value="EXPENSE"
            checked={values.type === "EXPENSE"}
            onChange={handleRadioChange}
          />
          <CustomRadio />
          Despesa
        </RadioLabel>
      </RadioContainer>
              <Row>
              <ContainerLabel>
                <Label id="category">Categoria</Label>
              </ContainerLabel>
              <Dropdown onChange={handleCategoryChange} value={values.category} name="category">
                <option value="">Selecione a categoria</option>
                {/* {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))} */}
              </Dropdown> 
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
              />
              </Row>

              {/* {errors.message && <ErrorSpan>{errors.message}</ErrorSpan>} */}
              <Row>

              <Button type="submit"><FontAwesomeIcon icon={faPlus} color="#FFFFFF" fontSize={18}/> Adicionar Transação</Button>
              </Row>
            </Form>
          </SectionForm>
        </GroupLine>
      </GroupWelcome>
    )
}
export default AddindTransaction;