import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Cadastro from "./components/cadastro";
import Login from './components/login';
import GlobalStyle from "./globalStyles";

export default function App(){
    //credenciais de teste:
    //email: Begizaldo@begibegi.com
    //senha: begizaldo
    return(
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro/" element={<Cadastro />} />
                <Route path="/habitos" />
                <Route path="/hoje" />
                <Route path="/historico" />
            </Routes>
        </BrowserRouter>
    );
}