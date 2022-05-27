import styled from 'styled-components';
import axios from 'axios';
import logo from '../assets/trackit.png'
import { Link, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { ThreeDots } from  'react-loader-spinner'
import UserContext from "../contexts";

export default function Login(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [isDisabled, setDisabled]=useState(false);
    const navigation=useNavigate();
    const { header, user} =useContext(UserContext);
    function entrar(event){
        event.preventDefault();
        const submitObject ={email:email,
            password:senha}
            setDisabled(true);
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", submitObject);
        requisicao.then(response =>{
            const infoObject={name:response.data.name,
                image:response.data.image}
            user.setInfo(infoObject);
            header.setConfig({
                headers: {
                    "Authorization": `Bearer ${response.data.token}`
                }
                });
            
            navigation('/hoje/')}
        );
        requisicao.catch(response =>{
            alert("Credenciais inválidas!");
            setDisabled(false);
            console.log(response.data);}
        );
    }
    return(
        <Container>
            <Logo src={logo} />
            <form onSubmit={entrar}>
            <Field type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' required disabled={isDisabled ? true : false} />
                <Field type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder='senha' required disabled={isDisabled ? true : false} />
                <Button type="submit" disabled={isDisabled ? true : false} >{isDisabled ? <ThreeDots color="white" height={40} width={40} /> : "Entrar"}</Button>
            </form>
            <Link to="/cadastro/">Não possui uma conta? cadastre-se!</Link>
        </Container>
    );
}
const Container=styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
form{
    width:305px;
}
a{
    font-size: 14px;
    text-decoration-line: underline;
    color: #52B6FF;
}
`;
const Field = styled.input`
margin-bottom: 6px;
`;
const Logo = styled.img`
margin-bottom: 32px;
margin-top:68px;
`;
const Button = styled.button`
background: #52B6FF;
border-radius: 4.63636px;
color:white;
border-style: none;
width:305px;
height:45px;
font-size: 20px;
margin-bottom: 36px;
:disabled{
    display:flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;
}
`
