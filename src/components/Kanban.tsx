import { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Input,
  Avatar,
  Tooltip,
} from "@mui/material";
import { LocalContext } from "../LocalContext";
import { useGetTasksForProject } from "../requests/queries";
import { EditTask } from "../pages/EditTask";
import {
  dbtaskStatus,
  projectRes,
  taskRes,
  usersRes,
} from "../Utils/Responses";
import { useDeleteTask, useUpdateTask } from "../requests/mutations";
import DeleteIcon from "@mui/icons-material/Delete";

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


type columnType = {
  name: string;
  items: taskType[];
};
type AllcolumnsType = {
  Analysis: columnType;
  Dev: columnType;
  qa: columnType;
  Done: columnType;
};

export type taskType = {
  id: string;
  content: string;
  color: string;
  Description: string;
  username: string;
  taskStatus: dbtaskStatus;
};
const loadFromLocalStorage = (data: taskRes[]): AllcolumnsType => {
  const newColumns: AllcolumnsType = {
    Analysis: {
      name: "Analysis",
      items: [],
    },
    Dev: {
      name: "In Dev",
      items: [],
    },
    qa: {
      name: "In QA",
      items: [],
    },
    Done: {
      name: "Done",
      items: [],
    },
  };
  if (data)
    data.map((task: taskRes) => {
      console.log("the task");
      const modifiedtask: taskType = {
        id: task.id,
        content: task.name,
        color: randomColor(),
        Description: task.description,
        username: task.user.name,
        taskStatus: task.status,
      };
      switch (task.status) {
        case "Analysis":
          {
            if (!newColumns.Analysis.items)
              newColumns.Analysis.items = [modifiedtask];
            else
              newColumns.Analysis.items = [
                ...newColumns.Analysis.items,
                modifiedtask,
              ];
          }
          break;
        case "Dev":
          {
            if (!newColumns.Dev.items) newColumns.Dev.items = [modifiedtask];
            else newColumns.Dev.items = [...newColumns.Dev.items, modifiedtask];
          }
          break;
        case "qa":
          {
            if (!newColumns.qa.items) newColumns.qa.items = [modifiedtask];
            else newColumns.qa.items = [...newColumns.qa.items, modifiedtask];
          }
          break;
        case "Done":
          {
            if (!newColumns.Done.items) newColumns.Done.items = [modifiedtask];
            else
              newColumns.Done.items = [...newColumns.Done.items, modifiedtask];
          }
          break;
      }
    });
  return newColumns;
};

// Initial data
// const initialColumns: AllcolumnsType = {
//   Analysis: {
//     name: "Analysis",
//     items: [
//       {
//         id: "1",
//         content: "New Task",
//         color: "#e91e63",
//         Description: "Add Description",
//       },
//     ],
//   },
//   Dev: {
//     name: "In Dev",
//     items: [
//       {
//         id: "2",
//         content: "Task 2",
//         color: "#2196f3",
//         Description: "Add Description",
//       },
//     ],
//   },
//   qa: {
//     name: "In QA",
//     items: [
//       {
//         id: "3",
//         content: "Task 3",
//         color: "#00bcd4",
//         Description: "Add Description",
//       },
//     ],
//   },
//   Done: {
//     name: "Done",
//     items: [
//       {
//         id: "4",
//         content: "Task 4",
//         color: "#ff9800",
//         Description: "Add Description",
//       },
//     ],
//   },
// };

const Board = ({
  Projects,
  Users,
}: {
  Projects: projectRes[];
  Users: usersRes[];
}) => {
  const { selectedProject, setEditTask } = useContext(LocalContext);

  const { data, error, isLoading} =
    useGetTasksForProject(selectedProject);
  const { mutate } = useUpdateTask();
  const { mutate: deleteMutation } = useDeleteTask();
  const [taskSelect, setTaskSelect] = useState({} as taskType);
  // if (isLoading && !data && !error) return <Loader />;
  
  // const initialTasksColumns = useCallback(() => {
  //   data?.map((task: taskRes) => {
  //     console.log("the task");
  //     const modifiedtask: taskType = {
  //       id: task.id,
  //       content: task.name,
  //       color: randomColor,
  //       Description: task.description,
  //     };
  //     switch (task.status) {
  //       case "Analysis":
  //         {
  //           if (!newColumns.Analysis.items)
  //             newColumns.Analysis.items = [modifiedtask];
  //           else
  //             newColumns.Analysis.items = [
  //               ...newColumns.Analysis.items,
  //               task as never,
  //             ];
  //         }
  //         break;
  //       case "Dev":
  //         {
  //           if (!newColumns.InDev.items)
  //             newColumns.InDev.items = [task as never];
  //           else
  //             newColumns.InDev.items = [
  //               ...newColumns.InDev.items,
  //               task as never,
  //             ];
  //         }
  //         break;
  //       case "Qa":
  //         {
  //           if (!newColumns.InQA.items) newColumns.InQA.items = [task as never];
  //           else
  //             newColumns.InQA.items = [...newColumns.InQA.items, task as never];
  //         }
  //         break;
  //       case "Done":
  //         {
  //           if (!newColumns.Done.items) newColumns.Done.items = [task as never];
  //           else
  //             newColumns.Done.items = [...newColumns.Done.items, task as never];
  //         }
  //         break;
  //     }
  //   });
  //   return newColumns;
  // }, [data]);
  // // State for columns
  // initialTasksColumns();
  const [columns, setColumns] = useState(loadFromLocalStorage(data));

  console.log("task get calls", data, error, isLoading);

  useEffect(() => {
    setColumns(loadFromLocalStorage(data));
  }, [data]);

  // useEffect(()=>{
  //   refetch()
  // },[])
  // Save to local storage whenever columns change
  // useEffect(() => {
  //   saveToLocalStorage(columns);
  // }, [columns]);

  // Handle drag end event
  const onDragEnd = (result: any) => {
    console.log(result);
    if (!result.destination) return;

    const { source, destination } = result;

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      console.log("droppableId", source.droppableId, destination.droppableId);
      const column = columns[source.droppableId as keyof AllcolumnsType];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      // Moving between columns
      const sourceColumn = columns[source.droppableId as keyof AllcolumnsType];
      const destColumn =
        columns[destination.droppableId as keyof AllcolumnsType];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log("removed", removed, sourceColumn);
      const selectedTask: taskRes[] = data.filter(
        (task: taskRes) => task.id === removed.id
      );
      mutate({
        id: selectedTask[0].id,
        task: {
          taskName: selectedTask[0].name,
          taskDescription: selectedTask[0].description,
          status: destination.droppableId as dbtaskStatus,
          projectId: selectedTask[0].project.id,
          userId: selectedTask[0].user.id,
        },
      });
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };
  const {  setOpenAddTask } = useContext(LocalContext);
  // Add a new task to a specific column
  const addTask = () => {
    setOpenAddTask(true);
    // const newTaskId = Date.now().toString();

    // const newTask = {
    //   id: newTaskId,
    //   content: `New Task`,
    //   color: `${randomColor}`,
    //   Description: "Add Description",
    // };
    // const column = columns[columnId as keyof AllcolumnsType];
    // const updatedItems = [...column.items, newTask];

    // setColumns({
    //   ...columns,
    //   [columnId]: {
    //     ...column,
    //     items: updatedItems,
    //   },
    // });
  };

  // Delete a task from a specific column
  const deleteTask = async ( taskId: string) => {
    await deleteMutation(taskId);
    console.log("the delete task", taskId);
    // setColumns({
    //   ...columns,
    //   [columnId]: {
    //     ...column,
    //     items: updatedItems,
    //   },
    // });
  };

  // const updateTask = (
  //   columnId: string,
  //   taskId: string,
  //   updatedField: { content?: string; Description?: string }
  // ) => {
  //   const column = columns[columnId];
  //   const updatedItems = column.items.map((item: any) =>
  //     item.id === taskId ? { ...item, ...updatedField } : item
  //   );

  //   setColumns({
  //     ...columns,
  //     [columnId]: {
  //       ...column,
  //       items: updatedItems,
  //     },
  //   });
  // };

  return (
    <>
      <EditTask Projects={Projects} Users={Users} selectedTask={taskSelect} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          gap={2}
          p={2}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    backgroundColor: "#e3f2fd",
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    minWidth: "250px",
                  }}
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    {column.name}
                  </Typography>
                  {/* Add Task Button */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => addTask()}
                    sx={{ marginBottom: 2, width: "20%" }}
                  >
                    +
                  </Button>

                  {column?.items?.map((item: taskType, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            marginBottom: 2,
                            backgroundColor: item.color,
                            position: "relative",
                          }}
                        >
                          <CardContent sx={{ display: "flex" }}>
                            <Box
                              onClick={() => {
                                setEditTask(true);
                                setTaskSelect(item);
                              }}
                            >
                              {/* Editable Task Title */}
                              <Input
                                value={item.content}
                                // onChange={(e) =>
                                //   updateTask(columnId, item.id, {
                                //     content: e.target.value,
                                //   })
                                // }
                                disableUnderline
                                fullWidth
                                sx={{
                                  backgroundColor: item.color,
                                  marginBottom: 1,
                                  borderRadius: 1,
                                }}
                              />
                              {/* Editable Task Description */}
                              <Input
                                value={item.Description}
                                multiline
                                disableUnderline
                                fullWidth
                                sx={{
                                  backgroundColor: item.color,
                                  borderRadius: 1,
                                }}
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginRight: "5px",
                                justifyItems: "center",
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                              }}
                            >
                              {/* Delete Task Button */}
                              <IconButton size="small">
                                <DeleteIcon
                                  aria-label="delete"
                                  fontSize="small"
                                  onClick={() => deleteTask( item.id)}
                                />
                              </IconButton>
                              <Tooltip title={item.username} arrow>
                                <Avatar
                                  sx={{
                                    height: 25,
                                    width: 25,
                                    fontSize: 10,
                                    background: "orangeRed",
                                  }}
                                  aria-label={item.username}
                                >
                                  {item.username[0].toUpperCase()}
                                </Avatar>
                              </Tooltip>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </>
  );
};

export default Board;
