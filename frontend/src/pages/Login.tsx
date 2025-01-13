import  { useState } from "react";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import Validation from "../hooks/LoginValidation"; 
import axios from "axios";
// Estilização utilizando styled-components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F5F5F5;
`;
const Form = styled.div`
  font-family: "Poppins", sans-serif;
  position: absolute;
  justify-content: center;
  display:flex;
  align-items:center;
  width: 320px;
  text-align: center;
`;
const Icon = styled.div`

`;
const Input = styled.input`
  width: 320px;
  height: 65px;
  margin-bottom: 5%;
  outline: none;
  border: none;
  border:solid 1px #D9D9D9;
  background: rgba(255, 255, 255, 0.2);
  color: #6F6F6F;
  font-size: 18px;
  text-align: left;
  padding-left:10px;
  border-radius: 5px;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:focus {
    border-left: solid 8px rgba(255, 255, 255, 0.5);
    border-right: solid 8px rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 15px rgba(193, 193, 193, 0.8);
  }
`;
const ContainerLabel = styled.div`
display:flex;
margin-bottom:2%;
justify-content:flex-start;
align-items:flex-start;
align-self:flex-start;
`;
const Button = styled.button`
  outline: none;
  border: none;
  font-weight:600;
  width: 320px;
  height: 65px;
  background: #282B2F;
  color: #fff;
  font-size: 17px;
  margin-bottom: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
   
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`;
const ButtonOut = styled.button`
  outline: none;
  border: none;
  width: 320px;
  height: 65px;
  background: transparent;
  margin-top:2%;
  font-weight:600;
  margin-bottom:2%;
  color: #2f2f2f;
  border: solid 1.6px #484848;
  font-size: 17px;
  letter-spacing: 0.2px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;
   
  &:hover {
   
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`;
const CenterContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  margin-bottom:2%;
`
const Options01 = styled.div`
  margin-bottom: 6%;
  margin-top:3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RememberMe = styled.label`
  color: #bbb;
  font-size: 14px;
  gap:6px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Links = styled.a`
  color: #888;
  font-size: 14px;
  font-style: italic;

  &:hover {
    color: #282B2F;
  }
`;
const Label = styled.label`
color:#7A7A7A;
font-size: 1.1rem;
text-align:left;
justify-content:flex-start;
`;
const Logo = styled.div`
 background-color:#282B2F;
 width:150px;
 height:55px;
 margin-bottom:6%;
`;
const Options02 = styled.div`
  color: #bbb;
  font-size: 14px;
  margin-top: 30px;

  a {
    color: #4285f4;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const ErrorSpan = styled.span`

color: #960707;
`

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {


  const [values, setValues] = useState<FormValues>({
    email: ' ',
    password:' '
})

const [errors, setErrors] = useState<Partial<FormValues>>({});

const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  
const [rememberMe, setRememberMe] = useState(false); //Lembrar de im opçao



const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  const validationErrors = Validation(values);
  setErrors(validationErrors);

  if (!validationErrors.email && !validationErrors.password) {
    try {
      const res = await axios.post("http://localhost:8081/Login", values);
      console.log(res.data);

      if (res.data === "Sucesso") {
        // Armazena o token no localStorage ou sessionStorage
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", res.data.token); // Salva o token

        navigate("/Dashboard");
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro no servidor. Tente novamente mais tarde.");
    }
  }
};



  return (
    <Container>
      <Form>
          <form onSubmit={handleSubmit}>
            <CenterContainer>
                <Logo></Logo>
            </CenterContainer>
            <ContainerLabel>
                    <Label htmlFor="email">Email</Label>
            </ContainerLabel>
            <Input onChange={handleInput}  type="email" placeholder="Digite seu email" name="email"  />
            {errors.email && <ErrorSpan>{errors.email}</ErrorSpan>}
            <ContainerLabel>
                    <Label htmlFor="password">Senha</Label>
            </ContainerLabel>
            <Input onChange={handleInput} type="password" placeholder="Digite sua senha" name="password"  />
          {errors.password && <ErrorSpan>{errors.password}</ErrorSpan>}
            <Options01>
              <RememberMe>
                <input type="checkbox"
                 checked={rememberMe}
                 onChange={(e) => setRememberMe(e.target.checked)}
                /> Lembrar de mim
              </RememberMe>
              <Links href="#">Esqueceu sua senha?</Links>
            </Options01>
            <Button type="submit">ENTRAR</Button>
            <Link to='/Register'>
            <ButtonOut >CRIAR UMA CONTA</ButtonOut>
            </Link>
            {/* <Options02>
              <p>
                Not Registered?{" "}
                <a href="#" onClick={toggleForm}>
                  Create an Account
                </a>
              </p>
            </Options02> */}
          </form>
      </Form>
    </Container>
  );
};

export default Login;
