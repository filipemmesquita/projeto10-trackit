import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
input{
    width:305px;
    height: 45px;
    font-size: 19.976px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 11px;
    box-sizing: border-box;
}
*{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
}
h1{
    font-size: 22.976px;
    color: #126BA5;
}
h2{
    font-size: 19.976px;
    color: #666666;
}
p{
    font-size: 17.976px;
    color: #666666;
}
`;


export default GlobalStyle;