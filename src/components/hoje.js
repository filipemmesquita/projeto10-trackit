import UserContext from "../contexts";
import { useContext } from "react";
import TopBar from "./topBar";
export default function Hoje(){
    const { header, user } =useContext(UserContext);
    console.log(header,user)
    return(
        <>
            <TopBar/>
            <h1>alert</h1>
        </>
    );
}