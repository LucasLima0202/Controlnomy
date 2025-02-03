import styled from "styled-components";

const GroupWelcome = styled.div`
width:80%;
display:flex;
justify-content:center;
gap:7px;
align-items:center;
flex-direction:row;
background-color:#FFFFFF;
margin-top:0%;
margin-bottom:4%;
padding: 4%;
border-radius: 8px;
box-shadow:  rgba(201, 201, 201, 0.15) 0px 4px 16px, rgba(201, 201, 201, 0.15) 0px 8px 32px;`


const GroupLine = styled.div`
width:90%;
border: solid #F1F1F1 0.8px;
display:flex;
justify-content:center;
gap:6%;
align-content:center;
align-items:center;
flex-direction:row;
background-color:#FFFFFF;
padding: 4%;
border-radius: 8px;
svg{
    transform: scale(1.05)
}
`

const Chartone = ({children}: any) => {
    return(
        <>
         <GroupWelcome>
                <GroupLine>
                    {children}
                </GroupLine>
            </GroupWelcome>
        </>
    )
}

export default Chartone;