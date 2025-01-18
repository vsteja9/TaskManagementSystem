import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import ScrumBoard from "./components/ScrumBoard.tsx";
import AnalyticsPage from "./components/Analytics.tsx";
import AddTask from "./components/AddTask.tsx";
import Layout from "./Layout.tsx";
import ContextProvider from "./LocalContext.tsx";
import LogOut from "./components/LogOut.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersList from "./pages/UsersList.tsx";
import Loader from "./pages/Loader.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </QueryClientProvider>
);
