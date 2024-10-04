import { Box, Tab, Tabs } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrumBoard from "./ScrumBoard";
import AnalyticsPage from "./AnalyticsPage";
import AddTaskIcon from '@mui/icons-material/AddTask';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MuiNavBar from "./MuiNavbar";
import Board from "./Kanban";

export default function  BodyComponent() {
  const [value, setvalue] = useState(0);
  const handleChange = (e: any, newval: number) => {
    console.log("target", e.target.value, newval);
    setvalue(newval);
  };
  return (
    <>
    
      <Box justifyContent={"center"} alignItems={"center"} display={"flex"} marginTop={2}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="scrumBoard" value={0} icon={<AddTaskIcon/>} iconPosition="start"/>
          <Tab label="analytics" value={1} icon={<QueryStatsIcon/>} iconPosition="start" />
        </Tabs>
      </Box>
      <Box>{value == 0 ? <Board /> : <AnalyticsPage />}</Box>
    </>
  );
}
