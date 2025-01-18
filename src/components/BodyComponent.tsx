import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import AnalyticsPage from "./Analytics";
import AddTaskIcon from "@mui/icons-material/AddTask";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Board from "./Kanban";
import AddProject from "../pages/AddProject";
import AddUser from "../pages/AddUser";
import { LocalContext } from "../LocalContext";
import AddTaskDialog from "../pages/AddTask";
import { CustomSnackBar } from "../pages/Register";

export default function BodyComponent({ Projects, Users }: any) {
  const [value, setvalue] = useState(0);
  console.log("projects and users in body components", Projects, Users);

  const {
    openProjectDialog,
    openUserDialog,
    openAddTask,
    setSnackBar,
    snackBar,
    snackBarMessage,
  } = useContext(LocalContext);
  const handleChange = (e: any, newval: number) => {
    console.log("target", e.target.value, newval);
    setvalue(newval);
  };
  console.log("values of snackbar in body", snackBar, snackBarMessage);
  return (
    <>
      <CustomSnackBar
        message={snackBarMessage}
        snackBar={snackBar}
        setSnackBar={setSnackBar}
      />
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        marginTop={2}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="scrumBoard"
            value={0}
            icon={<AddTaskIcon />}
            iconPosition="start"
          />
          <Tab
            label="analytics"
            value={1}
            icon={<QueryStatsIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <Box>
        {openUserDialog && <AddUser />}
        {openProjectDialog && <AddProject />}
        {openAddTask && <AddTaskDialog Projects={Projects} Users={Users} />}
        {value == 0 ? (
          <Board Projects={Projects} Users={Users} />
        ) : (
          <AnalyticsPage />
        )}
      </Box>
    </>
  );
}
