import { useState,useContext } from "react";
import UserContext from "../../contexts";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from  'react-loader-spinner'

export default function AddHabit(props){
const dayLetters=["D","S","T","Q","Q","S","S"];
const [selectedDays,setSelectedDays]=useState([])
const { header } =useContext(UserContext);
const [habitName,SetHabitName]=useState("");
const [isLoading,SetLoading]=useState(false);

function handleSave(event){
    const submitObject={name:habitName,days:selectedDays.sort()}
    if(habitName===""){
        alert("Preencha um nome para seu hábito!")
    }
    else if(selectedDays===[]){
        alert("Escolha quais dias da semana você ira praticar seu hábito!")
    }
    else{
    SetLoading(true);
    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", submitObject, header.config);
    request.then(request=>{
    SetLoading(false);
    console.log(request.data);
    SetHabitName("");
    setSelectedDays([]);
    props.setAdding(false);
    });
    request.catch(error=>{
        console.log(error.data);
    alert("Algo errado ocorreu!")
    SetLoading(false);
    });
    }
}

    return(
        <Content>
            <input type="text" placeholder="nome do hábito" value={habitName} onChange={e=>SetHabitName(e.target.value)} required disabled={isLoading? true:false}/>
            <DayWrapper>
            {dayLetters.map((letter, index)=><Day 
                isLoading={isLoading}
                index={index} 
                key={index} 
                selectedDays={selectedDays} 
                setSelectedDays={setSelectedDays}>
                    {letter}
                </Day>)}
            </DayWrapper>
            <ButtonWrapper>
            <Button bgcolor={"white"} color={"#52B6FF"} disabled={isLoading? true:false} onClick={()=>props.setAdding(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={isLoading? true:false} >{isLoading ? <ThreeDots color="white" height={40} width={40} /> : "Salvar"}</Button>
            </ButtonWrapper>
            
        </Content>
    );
}
function Day(props){
    const[isSelected,setSelected]=useState(false);
    function handleClick(){
        if(isSelected){deSelect()}
        else{select()}
    }
    function select(){
        setSelected(true);
        const newSelectedDays=[...props.selectedDays,props.index]
        props.setSelectedDays(newSelectedDays);
    }
    function deSelect(){
        setSelected(false);
        const newSelectedDays=[...props.selectedDays]
        function differentFromIndex(x){
            return x !== props.index;
        }
        props.setSelectedDays(newSelectedDays.filter(differentFromIndex));
    }
    return(
        <DayButton onClick={handleClick} isSelected={isSelected} disabled={props.isLoading? true:false}>{props.children}</DayButton>
    )
}
const Content=styled.div`
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
padding:19px;
box-sizing: border-box;
margin-bottom: 30px;
`;
const DayButton=styled.button`
background: ${props => props.isSelected? "#CFCFCF" : "#FFFFFF"};
border: 1px solid #D5D5D5;
border-radius: 5px;
width: 30px;
height:30px;
margin-right: 4px;
color:${props => props.isSelected ? "white" : "#DBDBDB"};
`;
const Button = styled.button`
background: ${props => props.bgcolor ? props.bgcolor : "#52B6FF"};
border-radius: 4.63636px;
color:${props => props.color ? props.color : "white"};
height: 35px;
padding:0 12px;
border-style: none;
margin:0 5px;
:disabled{
    display:flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;
}
`;
const DayWrapper=styled.div`
align-self: flex-start;
margin-top: 8px;
`;
const ButtonWrapper=styled.div`
display:flex;
align-self: flex-end;
margin-top: 30px;
`;