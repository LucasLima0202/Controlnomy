import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CardBox = styled.a `
height:55px;
width:55px;
background-color: #282B2F;
display:flex;
align-items:center;
justify-content: center;
border-radius: 4px;
transition: ease-in-out all 0.2s;

&:hover{
    transform:scale(1.05);
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);

}
`;
const CenterIcon = ({ icon }) => {
    return (_jsx(_Fragment, { children: _jsx(CardBox, { children: _jsx(FontAwesomeIcon, { icon: icon, color: "#FFFFFF", fontSize: 21 }) }) }));
};
export default CenterIcon;
