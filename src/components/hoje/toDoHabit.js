import styled from "styled-components";
import { useContext,useState } from "react";
import UserContext from "../../contexts";
import axios from "axios";

export default function ToDoHabit(props){
    const { header } =useContext(UserContext);
    const [isLoading,setLoading]=useState(false);
    function toggleDone(){
        if(!isLoading){
            if(props.done){
                setLoading(true);
                const requisition=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`,{}, header.config)
                requisition.then(response=>{
                    
                    setLoading(false);
                    props.requestTodayHabits()
                });
                requisition.catch(error=>{
                    alert("algo deu ruim")
                    console.log(error.data)
                });
            }
            if(!props.done){
                setLoading(true);
                const requisition=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`,{}, header.config)
                requisition.then(response=>{
                    setLoading(false);
                    props.requestTodayHabits()
                });
                requisition.catch(error=>{
                    alert("algo deu ruim")
                    console.log(error.data)
                });
            }
        }
    }
    return(
        <Container>
            <div>
                <h2>{props.habitName}</h2>
                <br />
                <p>Sequencia atual: <span>{props.currentSequence} dias</span></p>
                <p>Seu recorde: <span>{props.highestSequence} dias</span></p>
            </div>
            <IconWrapper done={props.done} onClick={toggleDone}>
             <ion-icon name="checkbox"></ion-icon>
            </IconWrapper>
        </Container>
    );
}
const Container=styled.div`
height:94px;
background: #FFFFFF;
border-radius: 5px;
display:flex;
box-sizing: border-box;
padding:15px;
justify-content: space-between;
margin-bottom:10px;
div p{
    font-size: 12.976px;
}
`;
const IconWrapper=styled.div`
ion-icon{
    font-size: 70px;
    color:${props => props.done ? "#8FC549" : "#E7E7E7"};
}
`;