// Importações necessárias
import { useState } from "react";
import styled from "styled-components";

// Estilos utilizando styled-components
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282B2F;
  color: white;
  position: fixed;
  top: 0;
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

const Title = styled.h1`
  margin: 0;
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
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
        <Title>Controlnomy</Title>
        <Avatar>A</Avatar>
      </NavbarContainer>

      {/* Dropdown menu */}
      <DropdownMenu isOpen={menuOpen}>
        <CloseButton onClick={handleToggleMenu}>×</CloseButton>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          Home
        </DropdownItem>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          Dashboard
        </DropdownItem>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          Settings
        </DropdownItem>
        <DropdownItem href="#" onClick={handleToggleMenu}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};

export default Navbar;
