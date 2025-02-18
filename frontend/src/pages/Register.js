import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";
import Validation from "../hooks/SingupValidation";
import { Link, useNavigate } from "react-router";
import axios from "axios";
// Estilização utilizando styled-components
const Container = styled.div `
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #282b2f;
  `;
const Form = styled.div `
  font-family: "Poppins", sans-serif;
  position: absolute;
  justify-content: center;
  display:flex;
  align-items:center;
  width: 320px;
  text-align: center;
`;
const Icon = styled.div `

`;
const Input = styled.input `
  width: 320px;
  height: 65px;
  margin-bottom: 5%;
  outline: none;
  border: none;
  border:solid 1px #D9D9D9;
  background: rgb(249, 249, 249);
  color: #6F6F6F;
  font-size: 18px;
  text-align: left;
  padding-left:10px;
  border-radius: 5px;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:focus {
 
    box-shadow: 0 0 15px rgba(193, 193, 193, 0.307);
  }
`;
const ContainerLabel = styled.div `
display:flex;
margin-bottom:2%;
justify-content:flex-start;
align-items:flex-start;
align-self:flex-start;
`;
const Button = styled.button `
  outline: none;
  border: none;
  font-weight:600;
  width: 99%;
  height: 65px;
  background: #DDAB06;
  color: #fff;
  font-size: 17px;
  margin-bottom: 5%;
  margin-top: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
   
    box-shadow: 0 0 30px rgba(131, 131, 131, 0.278);
  }
`;
const ButtonOut = styled.button `
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
const CenterContainer = styled.div `
  display: flex;
  justify-content:center;
  align-items:center;
  margin-bottom:3%;
`;
const Options01 = styled.div `
  margin-bottom: 6%;
  margin-top:3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RememberMe = styled.label `
  color: #bbb;
  font-size: 14px;
  gap:6px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Spancolor = styled.span `
  color: #FFBB38;
  text-decoration:underline;
`;
const Label = styled.label `
color:#a8a8a8;
font-size: 1.1rem;
text-align:left;
justify-content:flex-start;
`;
const Logo = styled.img `
  width: 90px;
  height: 90px;
`;
const Options02 = styled.div `
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
const ErrorSpan = styled.span `

color: #960707;
`;
const Register = () => {
    const [values, setValues] = useState({
        name: ' ',
        email: ' ',
        password: ' '
    });
    const [errors, setErrors] = useState({});
    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            try {
                const res = await axios.post('http://localhost:8081/api/Register', values);
                console.log(res.data);
                navigate('/');
            }
            catch (err) {
                console.error(err);
            }
        }
    };
    return (_jsx(Container, { children: _jsx(Form, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CenterContainer, { children: _jsx(Logo, { src: "/svg/LogoN.svg", alt: "Logo" }) }), _jsx(Icon, { className: "fas fa-user-plus" }), _jsx(ContainerLabel, { children: _jsx(Label, { htmlFor: "user", children: "Nome de Usuario" }) }), _jsx(Input, { onChange: handleInput, type: "text", placeholder: "Username", name: "name" }), errors.name && _jsx(ErrorSpan, { children: errors.name }), _jsx(ContainerLabel, { children: _jsx(Label, { htmlFor: "email", children: "Email" }) }), _jsx(Input, { onChange: handleInput, type: "email", placeholder: "Email Address", name: "email" }), errors.email && _jsx(ErrorSpan, { children: errors.email }), _jsx(ContainerLabel, { children: _jsx(Label, { htmlFor: "password", children: "Senha" }) }), _jsx(Input, { onChange: handleInput, type: "password", placeholder: "Password", name: "password" }), errors.password && _jsx(ErrorSpan, { children: errors.password }), _jsx(Button, { type: "submit", children: "SIGN UP" }), _jsx(Options02, { children: _jsxs("p", { children: ["Ja tem Cadastro?", " ", _jsx(Link, { to: "/", children: _jsx(Spancolor, { children: "Entrar na sua conta" }) })] }) })] }) }) }));
};
export default Register;
