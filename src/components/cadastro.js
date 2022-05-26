import styled from 'styled-components';
import axios from 'axios';
import logo from '../assets/trackit.png'
import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import { BallTriangle } from  'react-loader-spinner'

export default function Cadastro(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [nome, setNome] =useState("");
    const [foto, setFoto] =useState("");
    const [isDisabled, setDisabled]=useState(false);
    const navigation = useNavigate();

    function cadastrar(event){
        event.preventDefault();
        const submitObject ={email:email,
            name:nome,
            image:foto,
            password:senha}
            setDisabled(true);
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", submitObject);
        requisicao.then(
            navigation('/')
        );
        requisicao.catch(response =>{
            alert("Não foi possível concluir seu cadastro!");
            setDisabled(false);
            console.log(response.data);}
        );

        

    }
    return(
        <Container>
            <Logo src={logo} />
            <form onSubmit={cadastrar}>
                <Field type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' required disabled={isDisabled ? true : false} />
                <Field type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder='senha' required disabled={isDisabled ? true : false} />
                <Field type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder='nome' required disabled={isDisabled ? true : false} />
                <Field type="text" value={foto} onChange={e => setFoto(e.target.value)} placeholder='foto' required disabled={isDisabled ? true : false} />
                <Button type="submit" disabled={isDisabled ? true : false} >{isDisabled ? <BallTriangle color="white" height={40} width={40} /> : "Cadastrar"}</Button>
            </form>
            
            <Link to="/">Já possui uma conta? Faça login!</Link>
            
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
