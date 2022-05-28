import styled from "styled-components";
export default function ToDoHabit(props){
    return(
        <Container>
            <div>
                <h2>{props.habitName}</h2>
                <br />
                <p>Sequencia atual: <span>{props.currentSequence} dias</span></p>
                <p>Seu recorde: <span>{props.highestSequence} dias</span></p>
            </div>
            <IconWrapper done={props.done}>
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