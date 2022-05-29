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
    const [value, onChange] = useState(new Date());
    const { header} =useContext(UserContext);
    const [history, setHistory]=useState(null);
    function tileClassName({ date, view }) {
        let returnClass="";
        function isSameDay(day1,day2)
        {
            if(day1.$D===day2.$D&&day1.$M===day2.$M&&day1.$y===day2.$y){
                return true;
            }
            return false;
        }
        function allHabitsDone(historyHabits){
            let alldone=true;
            historyHabits.map(habit=>{
                if(!habit.done){alldone=false}
            })
            return alldone;
        }
        if (view === 'month') {
            history.map(history =>{
                if(isSameDay(dayjs(history.day, "DD-MM-YYYY"), dayjs(date))){
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

    useEffect(requestHabitHistory, []);

    return(
        <>
            <TopBar />
                <Container>
                <div>
                    <Calendar onChange={onChange} locale={"pt"} minDetail={"year"} calendarType={"US"} value={value} tileClassName={history!==null ? tileClassName:""} />
                </div>
                </Container>
            <Menu />
        </>
    );
}
const Container=styled.div`
min-height: 100%;
background-color:#E5E5E5;
padding:100px 18px 95px;
box-sizing: border-box;
display:flex;
flex-direction:column;
div{
    margin: 0 auto;
}
`;