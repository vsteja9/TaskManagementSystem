import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { LocalContext } from "../LocalContext";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Form,
  SubmitHandler,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
import { useAddProject } from "../requests/mutations";
import { projectReq } from "../Utils/RequestsDtos";
import { CustomSnackBar } from "../components/Register";
import { isDataView } from "util/types";
import Loader from "./Loader";

type projectdet = {
  name: string;
  description: string;
};
export default function AddProject() {
  const {
    openProjectDialog,
    setOpenProjectDialog,
    snackBar,
    setSnackBar,
    snackBarMessage,
  } = useContext(LocalContext);
  const [projectName, setProjectName] = useState("");
  const [projectDesp, setProjectDesp] = useState("");
  const { mutateAsync, isPending, isSuccess, isError } = useAddProject();
  if (isPending && !isSuccess && !isError) return <Loader />;
  const onSubmit = async () => {
    try {
      const payload: projectReq = {
        name: projectName,
        description: projectDesp,
      };
      await mutateAsync(payload);
    } finally {
      setProjectName("");
      setProjectDesp("");
      setOpenProjectDialog(false);
    }
  };
  return (
    <>
      <Dialog
        open={openProjectDialog}
        onClose={() => setOpenProjectDialog(false)}
      >
        <DialogContent
          sx={{
            height: 300,
            width: 600,
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" margin={3}>
              {" "}
              Add Project
            </Typography>
            <Box display={"flex"} flexDirection={"row"} gap={2} margin={5}>
              <Typography variant="h5" marginRight={7} paddingRight={2}>
                Name:
              </Typography>
              <TextField
                size="small"
                name="projectName"
                placeholder="Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Box>
            <Box display={"flex"} flexDirection={"row"} gap={4}>
              <Typography variant="h5">Description:</Typography>
              <TextField
                size="small"
                name="projectDesp"
                placeholder="Description"
                multiline
                value={projectDesp}
                rows={2}
                onChange={(e) => setProjectDesp(e.target.value)}
              />
            </Box>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ margin: "5px", marginRight: "20px" }}>
          <Button
            variant="outlined"
            onClick={() => setOpenProjectDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
