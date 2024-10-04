import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { LocalContext } from "../LocalContext";
import SignInWithGoogle from "./SignInWithGoogle";

export default function Login() {
  const [email, setEmail] = useState("");
  const { setIsBoardOpened } = useContext(LocalContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [successSnackBar, setSuccessSnackBar] = useState<boolean>(false);
  const [failedSnackBar, setFailedSnackBar] = useState<boolean>(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      console.log('values',email,password)
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessSnackBar(true);
      setIsBoardOpened(true);
    } catch (err) {
      console.log(err);
      setFailedSnackBar(true);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={successSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackBar(false)}
      >
        <Alert
          onClose={() => {
            setSuccessSnackBar(false);
            navigate("/mainpage");
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          User Login Successful.
        </Alert>
      </Snackbar>
      <Snackbar
        open={failedSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setFailedSnackBar(false)}
      >
        <Alert
          onClose={() => setFailedSnackBar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Sorry,User Login Failed.
        </Alert>
      </Snackbar>
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
        <SignInWithGoogle />
    </Container>
  );
}
