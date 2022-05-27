//import UserContext from "../contexts";
//import { useContext } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Menu(){


    return(
        <>
            <Container>
                <Link to="/habitos/"><Button>Hábitos</Button></Link>
                <ProgressBar><Link to="/hoje/">Hoje</Link></ProgressBar>
                <Link to="/historico/"><Button>Histórico</Button></Link>
            </Container>
        </>
    );
}
const Container=styled.div`
position:fixed;
left:0;
right:0;
bottom:0;
display:flex;
justify-content: space-between;
align-items: center;
background-color: white;
height: 70px;
`;
const Button=styled.div`
padding:22px 36px 26px;
font-size: 17.976px;
color: #52B6FF;
`;
const ProgressBar=styled.div`
position:relative;
bottom:20px;
height: 91px;
width: 91px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 98.5px;
background: #52B6FF;
a{
    color:white;
}
`;