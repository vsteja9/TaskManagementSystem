import {
  AppBar,
  Toolbar,
  IconButton,
  Autocomplete,
  TextField,
  Button,
  Avatar,
  Grid2,
  Typography,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Container,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalContext } from "../LocalContext";
import { StarBorderOutlined } from "@mui/icons-material";

export default function MuiNavBar() {
  const navigate = useNavigate();
  const {
    setIsAddTaskOpened,
    isAddTaskOpened,
    isBoardOpened,
    setIsBoardOpened,
  } = useContext(LocalContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    navigate("/logout");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    console.log;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid2
            container
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid2 display={"flex"}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0, pr: 1 }}
              >
                <img src=".././image.png" height={50} width={50} />
              </IconButton>
              <Typography
                variant="h5"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Task Management System
              </Typography>
            </Grid2>
            <Grid2
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              marginLeft={25}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                style={{
                  margin: "5px",
                  boxSizing: "content-box",
                  backgroundColor: isAddTaskOpened ? "#72BF78" : "inherit",
                }}
                onClick={() => {
                  setIsAddTaskOpened(true);
                  setIsBoardOpened(false);
                  navigate("/mainpage/addtask");
                }}
              >
                Add Task
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                style={{
                  margin: "5px",
                  boxSizing: "content-box",
                  backgroundColor: isBoardOpened ? "#72BF78" : "inherit",
                }}
                onClick={() => {
                  setIsAddTaskOpened(false);
                  setIsBoardOpened(true);
                  navigate("/mainpage");
                }}
              >
                Board
              </Button>
            </Grid2>
            <Grid2 sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    marginLeft: 70,
                    alignContent: "center",
                  }}
                >
                  V
                </Avatar>
              </IconButton>
              {/* </Tooltip> */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {["LogOut"].map((setting) => (
                  <MenuItem key={setting} onClick={handleLogOut}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
              {/* </Box> */}
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </>
  );
}
