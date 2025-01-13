import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";



const CardBox = styled.a`
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
`
interface CenterIconProps {
    icon: IconDefinition;
  }

const CenterIcon = ({icon}:CenterIconProps) => {
    return(
        <>
            <CardBox>
             <FontAwesomeIcon icon={icon} color="#FFFFFF" fontSize={21}/>
            </CardBox>
        </>
    )
}


export default CenterIcon;

