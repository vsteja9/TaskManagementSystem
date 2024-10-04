import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import ScrumBoard from "./components/ScrumBoard.tsx";
import AnalyticsPage from "./components/AnalyticsPage.tsx";
import AddTask from "./components/AddTask.tsx";
import Layout from "./Layout.tsx";
import ContextProvider from "./LocalContext.tsx";
import LogOut from "./components/LogOut.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<LogOut />}></Route>
        <Route path="/mainpage" element={<Layout />}>
          <Route index element={<App />}></Route>
          <Route path="addtask" element={<AddTask />}></Route>
        </Route>
        <Route path="/scrum" element={<ScrumBoard />}></Route>

        <Route path="/analytics" element={<AnalyticsPage />}></Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
