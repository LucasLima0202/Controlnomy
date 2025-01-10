import { useState } from "react";
import styled from "styled-components";

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
  margin-bottom: 30px;
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
`

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
  margin-bottom: 50px;
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

const Link = styled.a`
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
`
const Logo = styled.div`
 background-color:#282B2F;
 width:150px;
 height:55px;
 margin-bottom:6%;
`


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

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container>
      <Form>
        {isLogin ? (
          // Formulário de Login
          <form>
            <CenterContainer>
                <Logo></Logo>
            </CenterContainer>
            <ContainerLabel>
                    <Label>Usuario</Label>
            </ContainerLabel>
            <Input type="text" placeholder="Digite seu email" required />
            <ContainerLabel>
                    <Label>Senha</Label>
            </ContainerLabel>
            <Input type="password" placeholder="Digite sua senha" required />
            <Options01>
              <RememberMe>
                <input type="checkbox" /> Lembrar de mim
              </RememberMe>
              <Link href="#">Esqueceu sua senha?</Link>
            </Options01>
            <Button type="submit">ENTRAR</Button>
            <ButtonOut onClick={toggleForm}>CRIAR UMA CONTA</ButtonOut>
            {/* <Options02>
              <p>
                Not Registered?{" "}
                <a href="#" onClick={toggleForm}>
                  Create an Account
                </a>
              </p>
            </Options02> */}
          </form>
        ) : (
          // Formulário de Cadastro
          <form>
             <CenterContainer>
                <Logo></Logo>
            </CenterContainer>
            <Icon className="fas fa-user-plus" />
            <ContainerLabel>
                    <Label>Nome de Usuario</Label>
            </ContainerLabel>
            <Input type="text" placeholder="Username" required />
            <ContainerLabel>
                    <Label>Email</Label>
            </ContainerLabel>
            <Input type="email" placeholder="Email Address" required />
            <ContainerLabel>
                    <Label>Senha</Label>
            </ContainerLabel>
            <Input type="password" placeholder="Password" required />
            <Button type="submit">SIGN UP</Button>
            <Options02>
              <p>
               Ja tem Cadastro?{" "}
                <a href="#" onClick={toggleForm}>
                  Entrar na sua conta
                </a>
              </p>
            </Options02>
          </form>
        )}
      </Form>
    </Container>
  );
};

export default Login;
