import UserContext from "../contexts";
import { useContext } from "react";
import styled from 'styled-components';

export default function TopBar(){
    const { user } =useContext(UserContext);


    return(
        
            <Container>
                <h1>TrackIt</h1> <img src={user.info.image} alt="Foto do Usuário" />
            </Container>
       
    );
}
const Container =styled.div`
position:sticky;
top:0;
left:0;
right:0;
height:70px;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display:flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
box-sizing: border-box;
padding:0px 18px;
h1{
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    color:white;
}
img{
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
}
`;