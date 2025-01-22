import React from 'react';
import styled from 'styled-components';

// Define o tipo das propriedades do StyledButton
const StyledButton = styled.button<{ bgcolor?: string; color?: string; fontsize?: string }>`
  outline: none;
  border: none;
  font-weight: 600;
  width: 100%;
  height: 55px;
  background: ${({ bgcolor }) => bgcolor || '#282B2F'};  // Usar a cor de fundo fornecida ou o valor padrão
  color: ${({ color }) => color || '#fff'};  // Usar a cor fornecida ou o valor padrão
  font-size: ${({ fontsize }) => fontsize || '16px'};  // Usar o fontsize fornecido ou o valor padrão
  margin-bottom: 5%;
  margin-top: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
  padding-left:5%;
  padding-right:5%;


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
  fontsize,
}: {
  title?: string;
  onPress?: () => void;
  color?: string;
  children?: React.ReactNode;
  bgcolor?: string;
  fontsize?: string;
}) => {
  return (
    <StyledButton bgcolor={bgcolor} onClick={onPress} color={color} fontsize={fontsize}>
      {title}
      {children}
    </StyledButton>
  );
};

// Define o valor padrão para bgcolor e fontsize
Button.defaultProps = {
  bgcolor: '#343A40', // Cor de fundo padrão
  fontsize: '16px', // Tamanho de fonte padrão
};

export default Button;
