// Importações necessárias
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


// Estilos utilizando styled-components
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  gap:3rem;
  background-color: #282B2F;
  color: white;
  position: fixed;
  font-family: "Poppins", sans-serif;

  top: 0;
  margin:0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #aaa;
`;

const HamburgerMenu = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  background: transparent;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: inline-block;
    position: absolute;
    width: 45%;
    height: 3px;
    border-radius: 2px;
    background: #fff;
    transition: all 0.4s;
  }

  span:nth-of-type(1) {
    top: 17px;
  }
  span:nth-of-type(2) {
    top: 25px;
  }
  span:nth-of-type(3) {
    top: 33px;
  }

  &.active span:nth-of-type(1) {
    top: 18px;
    transform: translateY(6px) rotate(-45deg);
    width: 40%;
  }
  &.active span:nth-of-type(2) {
    opacity: 0;
  }
  &.active span:nth-of-type(3) {
    top: 30px;
    transform: translateY(-6px) rotate(45deg);
    width: 40%;
  }
`;
const ButtonLogout = styled.button`
  outline: none;
  border: none;
  font-weight:600;
  width: 100%;
  height: 65px;
  background: #550909;
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
   
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`

const Itens = styled.button`
  outline: none;
  border: none;
  font-weight:600;
  width: 100%;
  height: 45px;
  background: transparent;
  color: #fff;
  font-size: 17px;
  margin-top: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
   
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
`


const Title = styled.h1`
  margin: 0;
  font-family: "Inter";
  font-size: 1.2rem;
  text-align: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4d3b3b;
  border-radius: 50%;
  display: flex;
  line-height:-5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50%;
  background-color: #282B2F;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  z-index: 999;
`;

const DropdownItem = styled.a`
  color: white;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  padding-top:5%;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  &:hover {
    color: #aaa;
  }
`;

const CloseButton = styled.div`
  align-self: flex-end;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 2rem;
  color: white;
  &:hover {
    color: #aaa;
  }
`;

// Componente Navbar
const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  

const handleLogout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  navigate("/Login"); // Redireciona para a página de login
};

  return (
    <>
      {/* Navbar principal */}
      <NavbarContainer>
        <HamburgerMenu onClick={handleToggleMenu} className={menuOpen ? "active" : ""}>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerMenu>
        <Title>    <img src="/svg/LogoBig.svg" alt="Logo" /></Title>
        <Avatar>A</Avatar>
      </NavbarContainer>

      {/* Dropdown menu */}
      <DropdownMenu isOpen={menuOpen}>
        <CloseButton onClick={handleToggleMenu}>×</CloseButton>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          <Itens>Home</Itens>
        </DropdownItem>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          <Itens>Dashboard</Itens>
        </DropdownItem>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          <Itens>Settings</Itens>
        </DropdownItem>
        <DropdownItem onClick={handleLogout}>
          <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};

export default Navbar;
