import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { ReactNode, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalContext, parmanentProject } from "../LocalContext";
import {
  getTasksForProjectQueryKey,
  useGetAllProjects,
} from "../requests/queries";
import { projectRes } from "../Utils/Responses";
import { QueryClient } from "@tanstack/react-query";

export default function MuiNavBar({
  allProjects,
}: {
  allProjects: projectRes[] | undefined;
}) {
  console.log("navbarprops", allProjects);
  const navigate = useNavigate();
  const {
    setOpenProjectDialog,
    setOpenUserDialog,
    setSelectedProject,
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
  };

  const { data } = useGetAllProjects();

  const projectOption = useMemo(() => {
    if (allProjects)
      return allProjects.map((obj: any) => {
        return {
          label: obj.description,
          id: obj.id,
        };
      });
    else return [];
  }, [data]);

  const queryclient = new QueryClient();
  const handleProjectChange = (e: any, value: any) => {
    console.log("eventvalue", e, value, allProjects);
    setSelectedProject(value.id);
    queryclient.invalidateQueries({
      queryKey: getTasksForProjectQueryKey(value.id),
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
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
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              style={{
                margin: "5px",
                boxSizing: "content-box",
                backgroundColor: "inherit",
              }}
              onClick={() => {
                setOpenProjectDialog(true);
              }}
            >
              Add Project
            </Button>
            <Autocomplete
              sx={{ width: 200 }}
              onChange={handleProjectChange}
              renderInput={function (
                params: AutocompleteRenderInputParams
              ): ReactNode {
                return (
                  <>
                    <TextField
                      {...params}
                      label="Project"
                      size="small"
                      style={{
                        backgroundColor: "inherit",
                      }}
                      // {...register("status")}
                    />
                  </>
                );
              }}
              options={projectOption}
              defaultValue={parmanentProject}
            ></Autocomplete>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              style={{
                margin: "5px",
                boxSizing: "content-box",
                backgroundColor: "inherit",
              }}
              onClick={() => {
                navigate("/users");
              }}
            >
              Users List
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              style={{
                margin: "5px",
                boxSizing: "content-box",
                backgroundColor: "inherit",
              }}
              onClick={() => {
                setOpenUserDialog(true);
              }}
            >
              Add User
            </Button>
          </div>
          <div>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  alignContent: "center",
                }}
              >
                V
              </Avatar>
            </IconButton>
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
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
