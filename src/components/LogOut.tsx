import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  const [feedBack, setFeedback] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);
  return (
    <>
      <Box
        display={"flex"}
        // justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        marginTop={10}
      >
        <Snackbar
          open={submittedMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={() => setSubmittedMessage(false)}
        >
          <Alert
            onClose={() => setSubmittedMessage(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Thank you for Feedback.
          </Alert>
        </Snackbar>
        <Typography variant="h3" marginBottom={5}>
          Thank you for Visiting 🥰 🥰{" "}
        </Typography>
        <TextField
          value={feedBack}
          multiline
          helperText="Please add the feedback."
          sx={{ width: "40%" }}
          onChange={(e) => setFeedback(e.target.value)}
          inputProps={{ style: { padding: "4%" } }}
        ></TextField>
        <Button
          variant="outlined"
          sx={{ marginLeft: 60 }}
          onClick={() => {
            setSubmittedMessage(true);
            setFeedback("");
          }}
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          sx={{ margin: 5 }}
          onClick={() => navigate("/")}
        >
          Go to Register Page
        </Button>
      </Box>
    </>
  );
}
