import { Outlet } from "react-router-dom";
import MuiNavBar from "./components/MuiNavbar";

export default function Layout(){
    return(<>
    <MuiNavBar/>
    <Outlet/></>)
}