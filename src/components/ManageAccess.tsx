import { Grid2, Typography, InputLabel, Input, Button } from "@mui/material";
import { Form, useForm } from "react-hook-form";


interface IAddTask {
    taskTitle: string;
    taskDescription: string;
    taskAssignee: string;
    Project: string;
    storypoints: number;
  }

export default function ManageAccess(){
    const {control,register} = useForm<IAddTask>(
        {
            mode:'onChange',
            defaultValues:{

            }
        }
    );
    const onSubmit =(e:any)=>{

    }

    return( <Form onSubmit={onSubmit} control={control} className="addtask">
        <Grid2 container spacing={5} direction={'column'} marginTop={5}>
          <Typography fontSize={40} textAlign={'center'}>Manage Access </Typography>
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
            <InputLabel>Assignee</InputLabel>
            <Input {...register("taskAssignee")} placeholder="Assignee"></Input>
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
            <InputLabel>Project</InputLabel>
            <Input
              {...register("Project")}
              placeholder="project"
              type="select"
              aria-label="Demo input"
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
            <InputLabel>Story Points</InputLabel>
            <Input
              {...register("storypoints")}
              placeholder="title"
              type="number"
            ></Input>
          </Grid2>
          <Button type="submit">Submit</Button>
        </Grid2>
      </Form>)
}