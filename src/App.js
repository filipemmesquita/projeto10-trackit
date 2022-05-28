import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./components/cadastro";
import Login from './components/login';
import GlobalStyle from "./globalStyles";
import UserContext from "./contexts";
import { useState } from "react";
import Hoje from "./components/hoje/hoje";
import Habitos from "./components/habitos/habitos";
import Historico from "./components/historico/historico";



export default function App(){
    const [config,setConfig] = useState(null);
    const header={config, setConfig}
    const [info,setInfo]=useState(null);
    const user={info,setInfo}


    //credenciais de teste:
    //email: Begizaldo@begibegi.com
    //senha: begizaldo
    return(
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={{header,user}}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro/" element={<Cadastro />} />
                <Route path="/habitos/" element={<Habitos />} />
                <Route path="/hoje/" element={<Hoje />}/>
                <Route path="/historico/" element={<Historico />} />
            </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}