import React, { useState, useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Utility function for local storage
const saveToLocalStorage = (data: any) => {
  localStorage.setItem("kanban-board", JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem("kanban-board");
  return savedData ? JSON.parse(savedData) : null;
};

// Initial data
const initialColumns = {
  Analysis: {
    name: "Analysis",
    items: [
      {
        id: "1",
        content: "New Task",
        color: "#e91e63",
        Description: "Add Description",
      },
    ],
  },
  InDev: {
    name: "In Dev",
    items: [
      {
        id: "2",
        content: "Task 2",
        color: "#2196f3",
        Description: "Add Description",
      },
    ],
  },
  InQA: {
    name: "In QA",
    items: [
      {
        id: "3",
        content: "Task 3",
        color: "#00bcd4",
        Description: "Add Description",
      },
    ],
  },
  Done: {
    name: "Done",
    items: [
      {
        id: "4",
        content: "Task 4",
        color: "#ff9800",
        Description: "Add Description",
      },
    ],
  },
};

const Board: React.FC = () => {
  // State for columns
  const [columns, setColumns] = useState(
    loadFromLocalStorage() || initialColumns
  );

  // Save to local storage whenever columns change
  useEffect(() => {
    saveToLocalStorage(columns);
  }, [columns]);

  // Handle drag end event
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
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
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

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

  // Add a new task to a specific column
  const addTask = (columnId: string) => {
    const newTaskId = Date.now().toString();
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const newTask = {
      id: newTaskId,
      content: `New Task`,
      color: `${randomColor}`,
      Description: "Add Description",
    };
    const column = columns[columnId];
    const updatedItems = [...column.items, newTask];

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  // Delete a task from a specific column
  const deleteTask = (columnId: string, taskId: string) => {
    const column = columns[columnId];
    const updatedItems = column.items.filter((item: any) => item.id !== taskId);

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  const updateTask = (
    columnId: string,
    taskId: string,
    updatedField: { content?: string; Description?: string }
  ) => {
    const column = columns[columnId];
    const updatedItems = column.items.map((item: any) =>
      item.id === taskId ? { ...item, ...updatedField } : item
    );

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        gap={2}
        p={2}
      >
        {Object.entries(columns).map(([columnId, column]: any) => (
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
                  onClick={() => addTask(columnId)}
                  sx={{ marginBottom: 2, width: "20%" }}
                >
                  +
                </Button>

                {column?.items?.map((item: any, index: any) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        <CardContent>
                          <Box>
                            {/* Editable Task Title */}
                            <Input
                              value={item.content}
                              onChange={(e) =>
                                updateTask(columnId, item.id, {
                                  content: e.target.value,
                                })
                              }
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
                              onChange={(e) =>
                                updateTask(columnId, item.id, {
                                  Description: e.target.value,
                                })
                              }
                              multiline
                              disableUnderline
                              fullWidth
                              sx={{
                                backgroundColor: item.color,
                                borderRadius: 1,
                              }}
                            />

                            {/* Delete Task Button */}
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => deleteTask(columnId, item.id)}
                              sx={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
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
  );
};

export default Board;
