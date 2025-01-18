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
import { useForm } from "react-hook-form";
import { LocalContext } from "../LocalContext";
import { projectRes, usersRes } from "../Utils/Responses";
import { taskType } from "../components/Kanban";
import { useUpdateTask } from "../requests/mutations";

export const EditTask = ({
  Projects,
  Users,
  selectedTask,
}: {
  Projects: projectRes[];
  Users: usersRes[];
  selectedTask: taskType;
}) => {
  const { editTask, setEditTask } = useContext(LocalContext);
  const { selectedProject } = useContext(LocalContext);
  const filteredProject = Projects?.filter(
    (project: projectRes) => project.id === selectedProject
  );
  const filteredUser = Users?.filter(
    (user) => user.name === selectedTask.username
  );
  const { mutate } = useUpdateTask();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: selectedTask.content,
      description: selectedTask.Description,
      user: selectedTask.username,
      project: filteredProject && filteredProject[0]?.name,
    },
  });
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
  const handleClose = () => {
    setEditTask(false);
  };
  const onSubmit = (e: any) => {
    console.log("values from edit", e);
    const tempfilteredUser = Users.filter((user) => user.name === e.user);
    const tempfilteredProject = Projects.filter(
      (project) => project.name === e.project
    );
    const updateTaskpayload = {
      taskName: e.name || selectedTask.content,
      taskDescription: e.description || selectedTask.Description,
      status: selectedTask.taskStatus,
      projectId:
        (tempfilteredProject && tempfilteredProject[0]?.id) || selectedProject,
      userId:
        (tempfilteredUser && tempfilteredUser[0]?.id) ||
        (filteredUser && filteredUser[0]?.id),
    };
    mutate({ id: selectedTask.id, task: updateTaskpayload });
    setEditTask(false);
  };
  return (
    <>
      <Dialog open={editTask} onClose={handleClose}>
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
            <Typography variant="h4"> Edit Task</Typography>
            <TextField
              {...register("name")}
              placeholder="Name"
              sx={{ width: 300 }}
              defaultValue={selectedTask.content}
              // value={selectedTask.content}
              label="Name"
            />
            <TextField
              {...register("description")}
              placeholder="Description"
              sx={{ width: 300 }}
              label="Description"
              multiline
              defaultValue={selectedTask.Description}
              // value={selectedTask.Description}
              rows={2}
            />
            <Autocomplete
              sx={{ width: 300 }}
              defaultValue={{
                label: selectedTask.username,
                id: filteredUser && filteredUser[0]?.id,
              }}
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
              defaultValue={{
                label: filteredProject && filteredProject[0]?.name,
                id: selectedProject,
              }}
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
            <Button variant="outlined" onClick={() => setEditTask(false)}>
              Discard
            </Button>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
