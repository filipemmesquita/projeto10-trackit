import UserContext from "../../contexts";
import { useContext,useState } from "react";
import TopBar from "../topBar";
import Menu from "../menu";
import styled from "styled-components";
import AddHabit from "./addHabit";

export default function Hoje(){
    const { header, user } =useContext(UserContext);
    const [isAdding,setAdding]=useState(false);

    return(
        <>
            <TopBar />
            <Container>
                <TopWrapper>
                    <h1>Meus hábitos</h1><Button onClick={()=>setAdding(true)}>+</Button>
                </TopWrapper>
                {isAdding ? <AddHabit setAdding={setAdding} /> : "" }
                <Content>
                    <p>Você não tem nenhum hábito cadastrado ainda. adicione um hábito para começar a trackear!</p>
                </Content>

            </Container>
            <Menu />
        </>
    );
}

const Container = styled.div`
min-height: 100%;
background-color:#E5E5E5;
padding:100px 18px 95px;
box-sizing: border-box;
`;
const TopWrapper = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
`;
const Content =styled.div`
`;
const Button = styled.button`
background: #52B6FF;
border-radius: 4.63636px;
color:white;
height: 35px;
padding:0 12px;
border-style: none;
font-size: 27px;
`;