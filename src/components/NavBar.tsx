import "./Navbar.css";
import { Avatar, Button, Grid2, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Grid2 container>
          <Typography fontSize={30}>Task Management System</Typography>

          <Button variant="contained" style={{ margin: "5px", marginLeft:'50px'}}>
            Add task
          </Button>
          <Button variant="outlined" style={{ margin: "5px" }}>
            BackLog
          </Button>
          <Avatar sx={{ bgcolor: deepOrange[500],marginLeft:92}}>N</Avatar>
        </Grid2>
      </nav>
    </header>
  );
};
export default Navbar;
