import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useContext, useMemo } from "react";
import { LocalContext } from "../LocalContext";
import { useForm } from "react-hook-form";
import { projectRes, usersRes } from "../Utils/Responses";
import { useAddTask } from "../requests/mutations";
import Loader from "./Loader";

export type AddtaskType = {
  name: string;
  description: string;
  user: string;
  project: string;
};
export default function AddTaskDialog({
  Projects,
  Users,
}: {
  Projects: projectRes[];
  Users: usersRes[];
}) {
  const projectOptions = useMemo(() => {
    if (Projects)
      return Projects.map((project: projectRes) => {
        return {
          label: project.name,
          id: project.id,
        };
      });
    else return [];
  }, [Projects]);
  const usersOptions = useMemo(() => {
    if (Users)
      return Users.map((user: usersRes) => {
        return { label: user.name, id: user.id };
      });
    else return [];
  }, [Users]);
  const { mutate, isPending, isError, isSuccess } = useAddTask();
  const { openAddTask, setOpenAddTask } = useContext(LocalContext);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      description: "",
      user: "",
      project: "",
    },
  });
  const onSubmit = (data: AddtaskType) => {
    const selectedProject = Projects.filter(
      (project: projectRes) => project.name === data.project
    );
    const selectedUser = Users.filter(
      (user: usersRes) => user.name === data.user
    );
    console.log(
      "data from onsubmit",
      data,
      selectedProject,
      selectedUser,
      Projects,
      Users
    );
    const payload = {
      taskName: data.name,
      taskDescription: data.description,
      userId: selectedUser[0]?.id,
      projectId: selectedProject[0]?.id,
    };
    mutate(payload);
    setOpenAddTask(false);
  };
  if (isPending && !isError && !isSuccess) return <Loader />;
  return (
    <Dialog open={openAddTask} onClose={() => setOpenAddTask(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            gap: 5,
            width: "500px",
          }}
        >
          <Typography variant="h4"> Add Task</Typography>
          <TextField
            {...register("name")}
            placeholder="Name"
            sx={{ width: 300 }}
            label="Name"
          />
          <TextField
            {...register("description")}
            placeholder="Description"
            sx={{ width: 300 }}
            label="Description"
            multiline
            rows={2}
          />
          <Autocomplete
            sx={{ width: 300 }}
            renderInput={function (
              params: AutocompleteRenderInputParams
            ): ReactNode {
              return (
                <>
                  <TextField
                    {...params}
                    label="User"
                    fullWidth
                    {...register("user")}
                    style={{
                      backgroundColor: "inherit",
                    }}
                  />
                </>
              );
            }}
            options={usersOptions}
          ></Autocomplete>
          <Autocomplete
            sx={{ width: 300 }}
            renderInput={function (
              params: AutocompleteRenderInputParams
            ): ReactNode {
              return (
                <>
                  <TextField
                    {...params}
                    label="Project"
                    {...register("project")}
                    fullWidth
                    style={{
                      backgroundColor: "inherit",
                    }}
                  />
                </>
              );
            }}
            options={projectOptions}
          ></Autocomplete>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenAddTask(false)}>
            Discard
          </Button>
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
