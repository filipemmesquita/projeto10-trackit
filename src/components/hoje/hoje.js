import TopBar from "../topBar";
import Menu from "../menu";
import styled from "styled-components";
import ToDoHabit from "./toDoHabit";
import UserContext from "../../contexts";
import { useContext,useState,useEffect } from "react";
import dayjs from 'dayjs';
import axios from "axios";

export default function Hoje(){
    const DAY_NAMES=["Domingo", "Segunda-Feira", "Terça-Feira","Quarta-Feira", "Quinta-Feira","Sexta-Feira","Sábado"];
    const date=dayjs();
    const TODAY=date.$W;
    const { header } =useContext(UserContext);
    const [todayHabits,setTodayHabits] =useState([]);
    function requestTodayHabits(){
        const requisition=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", header.config)
        requisition.then(response=>{
            setTodayHabits(response.data)
        })
        requisition.catch(error=>{
            alert("algo deu ruim")
            console.log(error.data)
        });
    }
    useEffect(requestTodayHabits, []);

    return(
        <>
            <TopBar />
            <Container>
                <TitleWrapper>
                    <h1>{DAY_NAMES[TODAY]}, {TODAY}/{date.$M}</h1>
                    <h2>nenhum hábito concluído ainda</h2>
                </TitleWrapper>
                {todayHabits.length>0 ?
                       todayHabits.map(habit=>
                        <ToDoHabit key={habit.id} 
                        id={habit.id} 
                        done={habit.done}
                        currentSequence={habit.currentSequence}
                        highestSequence={habit.highestSequence}
                        habitName={habit.name}
                        requestTodayHabits={requestTodayHabits} />)
                        :
                        <p>Você não tem nenhum hábito hoje.</p>
                }
                
            </Container>
            <Menu />
        </>
    );
}
const Container = styled.div`
min-height: 700px;
background-color:#E5E5E5;
padding:100px 18px 95px;
box-sizing: border-box;
display:flex;
flex-direction:column;
`;
const TitleWrapper =styled.div`
margin-bottom: 28px;
h2{
    margin-top: 4px;
    color: #BABABA;
}
`;