import React from 'react';
import styled from 'styled-components';

// Define o tipo das propriedades do StyledButton
const StyledButton = styled.button<{ bgcolor?: string; color?: string }>`
  width: 200px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.color || '#fff'};
  cursor: pointer;
  background-color: ${(props) => props.bgcolor || '#343A40'};
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 8px;
  padding: 13px 20px 13px 20px;
  transition: all 0.4s ease-in-out;
  margin-top:2%;
  margin-bottom:2%;
  &:hover {
   transform: scale(1.07);
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
