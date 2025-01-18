import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { Snackbar, Alert } from "@mui/material";
import { LocalContext } from "../LocalContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { useRegisterMutation } from "../requests/mutations";
import { registerUserReq } from "../Utils/RequestsDtos";
import { UserRoles } from "../Utils/Responses";
import { generateToken } from "../requests";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
type registerData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type snackbarProps = {
  message: string;
  snackBar: boolean;
  setSnackBar: (val: boolean) => void;
};
export function CustomSnackBar(snackBarProps: snackbarProps) {
  const { message, snackBar, setSnackBar } = snackBarProps;

  console.log("from snackbar", message);
  return (
    <Snackbar
      open={snackBar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={() => setSnackBar(false)}
    >
      <Alert
        onClose={() => {
          setSnackBar(false);
        }}
        severity={message.endsWith("Again.") ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default function Register() {
  const passwordSchema =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
  const schema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup
      .string()
      .required()
      .matches(passwordSchema, { message: "Please enter strong password" }),
  });
  const { snackBarMessage, snackBar, setSnackBar } =
    React.useContext(LocalContext);
  // const [failedSnackBar, setFailedSnackBar] = useState<boolean>(false);

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   try {
  //     event.preventDefault();
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     const user = auth.currentUser;
  //     console.log("user object from auth", user);
  //     setSuccessSnackBar(true);
  //     setIsBoardOpened(true);
  //   } catch (err) {
  //     console.log(err);
  //     setFailedSnackBar(true);
  //   }
  // }
  const registermutation = useRegisterMutation();
  const onSubmit = async (data: registerData) => {
    const token = await generateToken({
      email: "vst123@gmail.com",
      password: "Vst@12345",
    });
    localStorage.setItem("JWTtoken", JSON.stringify(token));
    const modifieddata: registerUserReq = {
      name: data.firstName + data.lastName,
      role: UserRoles.user,
      email: data.email,
      password: data.password,
    };

    registermutation.mutate(modifieddata);
    localStorage.setItem(
      "userCred",
      JSON.stringify({
        email: data.email,
        password: data.password,
      })
    );

    // if (!snackBarMessage.endsWith("Again.")) navigate("/mainpage");
  };

  const formContext = useForm<registerData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // we need to integrate loader component here...

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CustomSnackBar
          message={snackBarMessage}
          snackBar={snackBar}
          setSnackBar={setSnackBar}
        />
        {/* <Snackbar
          open={SnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={() => setSnackBar(false)}
        >
          <Alert
            onClose={() => {
              setSnackBar(false);
              navigate("/mainpage");
            }}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            User Registration Successful.
          </Alert>
        </Snackbar> */}
        {/* <Snackbar
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
            Sorry,User Registration Failed.
          </Alert>
        </Snackbar> */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            😊 Welcome Buddy 😊
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formContext.handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={formContext.control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      autoComplete="given-name"
                      required
                      {...field}
                      error={!!error}
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={formContext.control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      required
                      error={!!error}
                      {...field}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={formContext.control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={formContext.control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      error={!!error}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
