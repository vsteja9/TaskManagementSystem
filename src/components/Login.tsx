import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { LocalContext } from "../LocalContext";
import { CustomSnackBar } from "./Register";
import { generateToken } from "../requests";
import { STATUS_CODES } from "http";
import { HttpStatusCode } from "axios";
import { useGenerateToken } from "../requests/mutations";
import Loader from "../pages/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const { setIsBoardOpened } = useContext(LocalContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { snackBarMessage, setSnackBarMessage, snackBar, setSnackBar } =
    useContext(LocalContext);
  const { mutate, isPending, isSuccess, isError } = useGenerateToken();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const token = await mutate({ email, password });
      localStorage.setItem("JWTtoken", JSON.stringify(token));
      localStorage.setItem(
        "userCred",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
      // setIsBoardOpened(true);
    } catch (err: any) {
      console.log("err value", err.status);
      if (err.status === HttpStatusCode.Unauthorized) {
        setSnackBarMessage("Unauthorised Login password.Please try Again.");
      } else {
        setSnackBarMessage("User Login Failed.Please try Again.");
      }
      throw err;
    } finally {
      setSnackBar(true);
    }
  }
  if (isPending && !isError && !isSuccess) return <Loader />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CustomSnackBar
        message={snackBarMessage}
        snackBar={snackBar}
        setSnackBar={setSnackBar}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <Link to={"/"}>register</Link>
      </Box>
    </Container>
  );
}
