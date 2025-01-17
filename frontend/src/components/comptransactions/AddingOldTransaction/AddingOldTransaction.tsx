import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddingTransactionValidation from "../../../hooks/AddTransaction";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAddingTransactionDateValidation from "../../../hooks/AddTransactionDate";
import {
    CustomRadio,
    RadioLabel,
    RadioContainer,
    Dropdown,
    ContainerLabel,
    ErrorSpan,
    GroupLine,
    Button,
    GroupWelcome,
    StyledDatePicker,
    RadioInput,
    Title,
    Form,
    SectionForm,
    Row,
    DateContent,
    Label,
    Input
} from "./AddingOldTransaction.styled"


interface TransactionData {
    value: number;
    type: boolean;
    category: string;
    description: string;
    date: string;
}

const AddingOldTransaction = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [values, setValues] = useState({
        value: 0,
        type: false,
        category: "",
        description: "",
        date: "",
    });

    const [errors, setErrors] = useState<any>({});
    const { validate } = useAddingTransactionDateValidation();
    const [categories, setCategories] = useState<any[]>([]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: name === "value" ? parseFloat(value) : value,
        });
    };


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, type: e.target.value === "true" });
    };


    useEffect(() => {
        axios
            .get("http://localhost:8081/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar categorias:", error);
            });
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validação no frontend
        const validationErrors = validate({
            ...values,
            date: startDate?.toISOString().slice(0, 10), // Formata a data para o formato correto
        });
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            // Envio de dados para o backend
            const response = await axios.post("http://localhost:8081/api/transactiondate", {
                ...values,
                date: startDate?.toISOString().slice(0, 10), // Inclui a data formatada
            });
    
            alert(response.data.message); // Mensagem de sucesso
            setValues({
                value: 0,
                type: false,
                category: "",
                description: "",
                date: "",
            });
            setStartDate(new Date()); // Reseta o componente de data
            window.location.reload(); // Recarrega a página
        } catch (error: any) {
            console.error("Erro ao adicionar transação:", error.response?.data || error.message);
        }
    };


    return (
        <GroupWelcome>
            <GroupLine>
                <Title>Adicionar Transação Passada</Title>
                <SectionForm>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <ContainerLabel>
                                <Label>Escolha uma data</Label>
                            </ContainerLabel>
                            <StyledDatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                            />
                        {errors.date && <ErrorSpan>{errors.date}</ErrorSpan>}

                        </Row>
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

export default AddingOldTransaction;
