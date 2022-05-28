import UserContext from "../contexts";
import { useContext,useEffect,useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Menu(){
    const { header, donePercent } =useContext(UserContext);
    const [percentMax, setPercentMax]=useState(null);
    const [percentCurrent,setPercentCurrent]=useState(0);
    function handleCall(){
        const requisition=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", header.config)
        requisition.then(response=>{
            setPercentMax(response.data.length);
            let newPercentCurrent=0;
            response.data.forEach(habit=>{if(habit.done){newPercentCurrent++}})
            setPercentCurrent(newPercentCurrent);            
        })
        requisition.catch(error=>{
            alert("algo deu ruim")
            console.log(error.data)
        });
    }
    function calculatePercent(){
        const result=(percentCurrent/percentMax)*100
        donePercent.setPercent(result);
    }
    useEffect(calculatePercent, [percentMax,percentCurrent]);
    useEffect(handleCall, [donePercent.call])

    return(
        <>
            <Container>
                <Link to="/habitos/"><Button>Hábitos</Button></Link>
                    <ProgressWrapper>
                        <Link to="/hoje/">
                            <CircularProgressbar
                                value={donePercent.percent}
                                text={"Hoje"}
                                background={true}
                                backgroundPadding={6}
                                styles={buildStyles({
                                    backgroundColor: "#52B6FF",
                                    textColor: "white",
                                    pathColor: "white",
                                    trailColor: "transparent"
                                  })}
                            />
                        </Link>
                    </ProgressWrapper>
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
const ProgressWrapper=styled.div`
position:relative;
bottom:20px;
height: 91px;
width: 91px;
`;