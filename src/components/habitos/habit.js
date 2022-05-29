import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../contexts";
import axios from "axios";
import dayjs from "dayjs";

export default function Habit(props){
const DAYLETTERS=["D","S","T","Q","Q","S","S"];
const { header,donePercent } =useContext(UserContext);
const date=dayjs();
function deleteHabit(){
    if(window.confirm("Tem certeza que deseja deletar este hábito?")){
    const requisition = axios.delete("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/"+props.id,header.config)
    requisition.then(()=>{
        props.requestHabitList()
        donePercent.setCall(date.$ms); 
    });
    requisition.catch(error=>{alert("Algo deu errado com a remoção");
        console.log(error.data)})
    }
}

    return(
        <Container>
            <h2>{props.habitName}</h2>
            <DayWrapper>
                {DAYLETTERS.map((letter, index)=><Day 
                    index={index} 
                    key={index} 
                    selectedDays={props.selectedDays}>
                        {letter}
                    </Day>)}
            </DayWrapper>
            <TrashWrapper onClick={deleteHabit}>
            <ion-icon name="trash-outline"></ion-icon>
            </TrashWrapper>
        </Container>
    );
}
function Day(props){
    const ISSELECTED=props.selectedDays.includes(props.index);
    return(
        <DayBox isSelected={ISSELECTED}>
            {props.children}
        </DayBox>
    );
};
const Container=styled.div`
height: 91px;
background: #FFFFFF;
border-radius: 5px;
position: relative;
padding:15px;
box-sizing: border-box;
display:flex;
flex-direction: column;
margin-bottom: 10px;
`;
const DayBox=styled.div`
background: ${props => props.isSelected ? "#CFCFCF" : "#FFFFFF"};
border: 1px solid #D5D5D5;
border-radius: 5px;
width: 30px;
height:30px;
margin-right: 4px;
display: flex;
justify-content: center;
align-items: center;
color:${props => props.isSelected ? "white" : "#DBDBDB"};
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
`;
const DayWrapper=styled.div`
display: flex;
justify-content: left;
margin-top: 8px;
`;
const TrashWrapper=styled.div`
width:13px;
height:15px;
position:absolute;
right:8px;
top:11px;
`;