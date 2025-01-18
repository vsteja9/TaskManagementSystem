import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { UserRoles } from "../Utils/Responses";

type UserDetails = {
  name: string;
  role: UserRoles;
  taskCount: number;
};

export default function UserCard(userDetails: UserDetails) {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  console.log("from the card", userDetails);
  return (
    <Card style={{ margin: "20px", height: "15%", width: "30%" }}>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">{userDetails.name}</Typography>
          <Avatar sx={{ bgcolor: randomColor, textAlign: "center" }}>
            {userDetails.name[0].toUpperCase()}
          </Avatar>
        </Box>
        <Typography>Role: {userDetails.role}</Typography>
        <Typography>Assigned Tasks: {userDetails.taskCount}</Typography>
      </CardContent>
    </Card>
  );
}
