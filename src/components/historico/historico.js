import TopBar from "../topBar";
import Menu from "../menu";
import styled from "styled-components";
import { useState,useContext,useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import './tileSelection.css';
import dayjs from "dayjs";
import UserContext from "../../contexts";
import axios from "axios";
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);

export default function Historico(){
    const { header} =useContext(UserContext);
    const [history, setHistory]=useState(null);
    const [selectedDay,setSelectedDay]=useState(null);
    const habitDays=[]; 

    function isSameDay(day1,day2)
        {
            if(day1.$D===day2.$D&&day1.$M===day2.$M&&day1.$y===day2.$y){
                return true;
            }
            return false;
        }
    function tileClassName({ date, view }) {
        let returnClass="";
        
        function allHabitsDone(historyHabits){
            let alldone=true;
            historyHabits.forEach(habit=>{
                if(!habit.done){alldone=false}
            })
            return alldone;
        }
        if (view === 'month') {
            history.forEach(history =>{
                if(isSameDay(dayjs(history.day, "DD-MM-YYYY"), dayjs(date))){
                    habitDays.push(dayjs(date));
                    if(allHabitsDone(history.habits)){
                        returnClass="green";
                    }
                    else{
                        returnClass="red";
                    }
                }
            })
                
                 
       
        }
        return returnClass;
      }

    function requestHabitHistory(){
        const requisition=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", header.config)
        requisition.then(response=>{
            setHistory(response.data);
        })
        requisition.catch(error=>{
            alert("algo deu ruim")
            console.log(error.data)
        });
    }

    function onChange(nextValue) {
        if(history){
            setSelectedDay(history.find(history=>
                isSameDay(dayjs(nextValue),dayjs(history.day, "DD-MM-YYYY"))))
        }
        

    }

    useEffect(requestHabitHistory, []);

    return(
        <>
            <TopBar />
                <Container>
                    <Content>
                        <div>
                            <Calendar onChange={onChange} locale={"pt"} minDetail={"year"} calendarType={"US"} tileClassName={history!==null ? tileClassName:""} />
                        </div>
                    </Content>
                    <Content>
                        {selectedDay ? selectedDay.habits.map(habit=>
                        <ShowDay habit={habit} key={habit.id} />) :""}
                    </Content>
                </Container>
            <Menu />
        </>
    );
}
function ShowDay(props){
    return(
        <DayWrapper>
            <div>
                <h2>{props.habit.name}</h2>
                <br />
                <p>{props.habit.done?"Este hábito foi cumprido esse dia!":"Este hábito não foi cumprido este dia."}</p>
            </div>
            <IconWrapper done={props.habit.done} >
                <ion-icon name={props.habit.done? "checkmark-circle": "close-circle"}></ion-icon>
            </IconWrapper>
       

        </DayWrapper>
    );
}

const Container=styled.div`
min-height: 100%;
background-color:#E5E5E5;
padding:100px 18px 95px;
box-sizing: border-box;
display:flex;
flex-direction:column;
`;
const Content=styled.div`
margin:0 auto 15px;
`;
const DayWrapper=styled.div`
height:94px;
width:300px;
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
    color:${props => props.done ? "#8FC549" : "#ea5766"};
}
`;