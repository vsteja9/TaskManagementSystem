import { Box, Typography } from "@mui/material";
import UserCard from "../components/UserCard";
import { UserRoles } from "../Utils/Responses";
import Back from "../assets/Back.png";
import { useNavigate } from "react-router-dom";
import { useGetAllUsers } from "../requests/queries";
import { useMemo } from "react";
import Loader from "./Loader";

export type userProfile = {
  name: string;
  role: UserRoles;
  taskCount: number;
};
export default function UsersList({ Users, error, isLoading }: any) {
  const navigate = useNavigate();

  // const usersList = useMemo(() => {
  //   if (data) {
  //     data.map((obj) => {
  //       console.log("values", obj);
  //       return {
  //         name: obj.name,
  //         role: obj.role,
  //         taskCount: obj.tasks.length,
  //       };
  //     });
  //   } else return [];
  // }, [data]);
  const usersList = Users?.map((obj: any) => {
    return { name: obj.name, role: obj.role, taskCount: obj.tasks.length };
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Typography variant="h4" textAlign={"center"}>
        There is no Previleges to view this Page
      </Typography>
    );
  return (
    <>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <img
          src={Back}
          height="0.5%"
          width="2%"
          style={{ margin: "20px", cursor: "pointer" }}
          onClick={() => {
            navigate("/mainpage");
          }}
        />
        <Typography
          variant="h3"
          color="info"
          textAlign={"center"}
          marginLeft={"480px"}
        >
          Employees List
        </Typography>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {usersList?.map((user: userProfile) => (
          <UserCard
            name={user.name}
            role={user.role}
            taskCount={user.taskCount}
          />
        ))}
      </Box>
    </>
  );
}
