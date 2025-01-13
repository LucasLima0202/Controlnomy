import React from 'react';
import styled from 'styled-components';

// Define o tipo das propriedades do StyledButton
const StyledButton = styled.button<{ bgcolor?: string; color?: string }>`


  outline: none;
  border: none;
  font-weight:600;
  width: 100%;
  height: 65px;
  background: #282B2F;
  color: #fff;
  font-size: 17px;
  margin-bottom: 5%;
  margin-top: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition:all ease-in-out 0.2s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }


  &:focus {
    outline: none;
  }
`;

// Componente Button
const Button = ({
  title,
  onPress,
  color,
  children,
  bgcolor,
}: {
  title?: string;
  onPress?: () => void;
  color?: string;
  children?: React.ReactNode;
  bgcolor?: string;
}) => {
  return (
    <StyledButton bgcolor={bgcolor} onClick={onPress} color={color}>
      {title}
      {children}
    </StyledButton>
  );
};

// Define o valor padrão para bgcolor
Button.defaultProps = {
  bgcolor: '#343A40', // Cor de fundo padrão
};

export default Button;
