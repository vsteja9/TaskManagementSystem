import { Box, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { useContext } from "react";
import { LocalContext } from "../LocalContext";

export default function SignInWithGoogle() {
  const navigate = useNavigate();
  const { setIsBoardOpened } = useContext(LocalContext);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result: any) => {
      console.log(result);
      if (result?.user) {
        setIsBoardOpened(true);
        navigate("/mainpage");
      }
    });
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={2}
        sx={{ cursor: "pointer" }}
      >
        <Typography fontSize={"1"} margin={3}>
          - or -
        </Typography>
        <img
          src="../google.png"
          width={"60%"}
          height={"20%"}
          onClick={googleSignIn}
        />
      </Box>
    </>
  );
}
