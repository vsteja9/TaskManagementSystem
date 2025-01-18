import { Outlet } from "react-router-dom";
import MuiNavBar from "./components/MuiNavbar";
import { projectRes } from "./Utils/Responses";

export default function Layout({
  allProjects,
}: {
  allProjects: projectRes[] | undefined;
}) {
  return (
    <>
      <MuiNavBar allProjects={allProjects} />
      <Outlet />
    </>
  );
}
