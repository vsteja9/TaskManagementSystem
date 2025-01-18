import { createContext, useState } from "react";

export const parmanentProject = {
  label: "Sai Smart Manager",
  id: "fff5bbdd-ce5c-4b79-b971-91dc44843e51",
};
interface states {
  isBoardOpened: boolean;
  setIsBoardOpened: (val: boolean) => void;
  snackBar: boolean;
  setSnackBar: (val: boolean) => void;
  snackBarMessage: string;
  setSnackBarMessage: (val: string) => void;
  openProjectDialog: boolean;
  openUserDialog: boolean;
  setOpenProjectDialog: (val: boolean) => void;
  setOpenUserDialog: (val: boolean) => void;
  openAddTask: boolean;
  setOpenAddTask: (val: boolean) => void;
  selectedProject: string;
  setSelectedProject: (val: string) => void;
  editTask: boolean;
  setEditTask: (val: boolean) => void;
}
export const LocalContext = createContext<states>({
  isBoardOpened: false,
  setIsBoardOpened: function (): void {},
  snackBar: false,
  setSnackBar: function (): void {},
  snackBarMessage: "",
  setSnackBarMessage: function (): void {},
  openProjectDialog: false,
  openUserDialog: false,
  setOpenProjectDialog: function (): void {},
  setOpenUserDialog: function (): void {},
  openAddTask: false,
  setOpenAddTask: function (): void {},
  selectedProject: parmanentProject.id,
  setSelectedProject: function (): void {},
  editTask: false,
  setEditTask: function (): void {},
});

export default function ContextProvider({ children }: any) {
  const [isBoardOpened, setIsBoardOpened] = useState<boolean>(false);
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState(parmanentProject.id);
  const [editTask, setEditTask] = useState(false);

  return (
    <LocalContext.Provider
      value={{
        isBoardOpened,
        setIsBoardOpened,
        snackBar,
        setSnackBar,
        snackBarMessage,
        setSnackBarMessage,
        openProjectDialog,
        openUserDialog,
        setOpenProjectDialog,
        setOpenUserDialog,
        openAddTask,
        setOpenAddTask,
        selectedProject,
        setSelectedProject,
        editTask,
        setEditTask,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}
