import {
  Alert,
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Grid2,
  Input,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useForm } from "react-hook-form";
import "./components.css";
import { ReactNode, useState } from "react";

interface IAddTask {
  taskTitle: string;
  taskDescription: string;
  status: string;
}

export default function AddTask() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  // if we want to use the 3rd party libraries like mui, we need to use controller..
  const { control, register } = useForm<IAddTask>({
    mode: "onChange",
    defaultValues: {
      taskTitle: "",
      taskDescription: "",
      status: "Analysis",
    },
  });

  // const { register, handleSubmit,  } = useForm<IAddTask>();
  //console.log(control);
  // temporary data actual data need to fetch from api

  const onSubmit = (e: any) => {
    const localvalues = localStorage.getItem("kanban-board");

    if (localvalues) {
      let parsedValues = JSON.parse(localvalues);
      const selectedcolumnItems = parsedValues[e.data.status].items;
      selectedcolumnItems.push({
        Description: e.data.taskDescription,
        color: "#00bcd4",
        content: e.data.taskTitle,
        id: Date.now().toString(),
      });
      parsedValues[e.data.status].items = [...selectedcolumnItems];
      localStorage.setItem("kanban-board", JSON.stringify(parsedValues));
      setShowSnackBar(true);
      console.log(showSnackBar);
    }
  };
  // using react hook form.directly we can't use the mui component in the form, so we
  // need to provide the controller to control the events and actions.
  return (
    <Form onSubmit={onSubmit} control={control} className="addtask">
      <Snackbar
        open={showSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setShowSnackBar(false)}
      >
        <Alert
          onClose={() => setShowSnackBar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully added the task.
        </Alert>
      </Snackbar>
      <Grid2 container spacing={5} direction={"column"} marginTop={5}>
        <Typography fontSize={40} textAlign={"center"}>
          Add Task{" "}
        </Typography>
        <Grid2
          sx={{
            display: "flex",
            gap: "20px",
            fontSize: "100",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputLabel>Title</InputLabel>
          <Input {...register("taskTitle")} placeholder="title"></Input>
        </Grid2>

        <Grid2
          sx={{
            display: "flex",
            gap: "20px",
            fontSize: "100",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputLabel>Description</InputLabel>
          <Input
            {...register("taskDescription")}
            placeholder="Description"
          ></Input>
        </Grid2>

        <Grid2
          sx={{
            display: "flex",
            gap: "20px",
            fontSize: "100",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputLabel>Status</InputLabel>
          <Autocomplete
            sx={{ width: 200 }}
            renderInput={function (
              params: AutocompleteRenderInputParams
            ): ReactNode {
              return (
                <>
                  <TextField
                    {...params}
                    label="status"
                    fullWidth
                    {...register("status")}
                  />
                </>
              );
            }}
            options={[
              { label: "Analysis", id: 1 },
              { label: "InDev", id: 2 },
              { label: "InQA", id: 3 },
              { label: "Done", id: 4 },
            ]}
          ></Autocomplete>
        </Grid2>
        <Button type="submit">Submit</Button>
      </Grid2>
    </Form>
  );
}

{
  /* <Form
      {...register}
      control={control}
      className="addtask"
      onClick={handleSubmit(onSubmit)}
    >
      <Typography>Add Task</Typography>
      <Box>
        <label
          style={{ fontWeight: "bold", fontSize: "20px", padding: "20px" }}
        >
          Title
        </label>
        <TextField
        
          label="title"
          variant="outlined"
          name="taskTitle"
          {...register}
        />
      </Box>{" "}
      <Box>
        <label>Description</label>
        <Controller
          control={control}
          name="taskDescription"
          render={({ field, fieldState }) => (
            <TextField value={field.value} variant="outlined"
            onChange={field.onChange}
            label={'Description'} />
          )}
        ></Controller>
      </Box>
      <Button type="submit">Submit</Button>
    </Form> */
}
