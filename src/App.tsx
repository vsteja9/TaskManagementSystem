import { useContext } from "react";
import BodyComponent from "./components/BodyComponent";
import ContextProvider, { LocalContext } from "./LocalContext";
import AddTask from "./components/AddTask";

function App() {
  const { isAddTaskOpened } = useContext(LocalContext);
  // need to define one provider and
  //that should have states of the particular buttons. and that we need to wrap it.

  return <>{isAddTaskOpened ? <AddTask /> : <BodyComponent />}</>;
}

export default App;
