import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Importações necessárias
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Estilos utilizando styled-components
const NavbarContainer = styled.nav `
  display: flex;
  justify-content: space-evenly;
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
const HamburgerMenu = styled.div `
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
const ButtonLogout = styled.button `
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
`;
const Itens = styled.button `
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
`;
const Title = styled.h1 `
  margin: 0;
  font-family: "Inter";
  font-size: 1.2rem;
  text-align: center;
`;
const Avatar = styled.div `
  width: 40px;
  height: 40px;
  display: flex;
  line-height:-5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const DropdownMenu = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isOpen",
}) `
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
const DropdownItem = styled(Link) `
  color: white;
  text-decoration: none;
  font-weight:600;
  text-transform:uppercase;
  text-align:center;
  font-family: "Poppins", sans-serif;
  padding-top:9%;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-decoration:none !important;

  a{
    text-decoration:none !important;

  }
  &:hover {
    color: #aaa;
  }
`;
const CloseButton = styled.div `
  align-self: flex-end;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 2rem;
  color: white;
  &:hover {
    color: #aaa;
  }
`;
const Logo = styled.img `
width:100%;
@media (max-width: 568px) {
  margin-top:2%;
  width:90%;
  }
`;
const Linkcustom = styled.a `
text-decoration:none !important;
color: #FFFFFF;

`;
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleToggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };
    const handleLogout = () => {
        // Lógica para logout
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        console.log("Logout realizado.");
    };
    return (_jsxs(_Fragment, { children: [_jsxs(NavbarContainer, { children: [_jsxs(HamburgerMenu, { onClick: handleToggleMenu, className: menuOpen ? "active" : "", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsx(Title, { children: _jsx(Logo, { src: "/svg/LogoBig.svg", alt: "Logo" }) }), _jsx(Avatar, {})] }), _jsxs(DropdownMenu, { isOpen: menuOpen, children: [_jsx(CloseButton, { onClick: handleToggleMenu, children: "\u00D7" }), _jsx(DropdownItem, { to: "/dashboard", onClick: handleToggleMenu, children: "Dashboard" }), _jsx(DropdownItem, { to: "/transactions", onClick: handleToggleMenu, children: "Transa\u00E7\u00F5es" }), _jsx(DropdownItem, { to: "/settings", onClick: handleToggleMenu, children: "Settings" }), _jsx(ButtonLogout, { onClick: handleLogout, children: "Logout" })] })] }));
};
export default Navbar;
