import UserContext from "../../contexts";
import { useContext,useState,useEffect } from "react";
import TopBar from "../topBar";
import Menu from "../menu";
import styled from "styled-components";
import AddHabit from "./addHabit";
import axios from "axios";
import Habit from "./habit";

export default function Habitos(){
    const { header } =useContext(UserContext);
    const [habitList,setHabitList]=useState([])
    function requestHabitList(){
        const requisition=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", header.config)
        requisition.then(response=>{
            setHabitList(response.data)
        });
        requisition.catch(error=>{
            alert("algo deu ruim")
            console.log(error.data)
        });
    }
    useEffect(requestHabitList, []);

    const [isAdding,setAdding]=useState(false);
    const [habitName,setHabitName]=useState("");
    const [selectedDays,setSelectedDays]=useState([]);

    



    return(
        <>
            <TopBar />
            <Container>
                <TopWrapper>
                    <h1>Meus hábitos</h1><Button onClick={()=>setAdding(true)}>+</Button>
                </TopWrapper>
                {isAdding ? <AddHabit 
                setAdding={setAdding}
                habitName={habitName}
                setHabitName={setHabitName}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                requestHabitList={requestHabitList} /> : "" }
                <Content>
                    {habitList.length>0 ?
                            habitList.map(habit=>
                            <Habit key={habit.id} 
                            id={habit.id} 
                            selectedDays={habit.days} 
                            habitName={habit.name}
                            requestHabitList={requestHabitList} />)
                        :
                            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    }
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
display:flex;
flex-direction:column;
`;
const TopWrapper = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
`;
const Content =styled.div`
display:flex;
flex-direction: column;
justify-content: center;
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