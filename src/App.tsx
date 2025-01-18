import BodyComponent from "./components/BodyComponent";
import UsersList from "./pages/UsersList";
import AddTask from "@mui/icons-material/AddTask";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsPage from "./components/Analytics";
import Login from "./pages/Login";
import LogOut from "./components/LogOut";
import Register from "./pages/Register";
import ScrumBoard from "./components/ScrumBoard";
import Layout from "./Layout";
import Loader from "./pages/Loader";
import { useGetAllProjects, useGetAllUsers } from "./requests/queries";

function App() {
  // const { isBoardOpened, setSnackBar } = useContext(LocalContext);
  const { data: allProjects } = useGetAllProjects();
  const {
    data: allUsers,
    error: usersError,
    isLoading: usersisLoading,
  } = useGetAllUsers();
  // need to define one provider and
  //that should have states of the particular buttons. and that we need to wrap it.

  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<LogOut />}></Route>
          <Route
            path="/mainpage"
            element={<Layout allProjects={allProjects} />}
          >
            <Route
              index
              element={
                <BodyComponent Projects={allProjects} Users={allUsers} />
              }
            ></Route>
            <Route path="addtask" element={<AddTask />}></Route>
          </Route>
          <Route path="/scrum" element={<ScrumBoard />}></Route>
          <Route
            path="/users"
            element={
              <UsersList
                Users={allUsers}
                error={usersError}
                isLoading={usersisLoading}
              />
            }
          ></Route>
          <Route path="/test" element={<Loader />}></Route>
          <Route path="/analytics" element={<AnalyticsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
  //<BodyComponent />;
}

export default App;
