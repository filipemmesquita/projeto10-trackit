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
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #DBDBDB;
        opacity: 1; /* Firefox */
    }
}
h1,h2,h3,p,a{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
}
a{
    text-decoration: none;
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
.root, body, html{
    height:100%;
}
`;



export default GlobalStyle;