import { createContext, useState } from "react";

interface states {
  isAddTaskOpened: boolean;
  setIsAddTaskOpened: (val: boolean) => void;
  isBoardOpened: boolean;
  setIsBoardOpened: (val: boolean) => void;
}
export const LocalContext = createContext<states>({
  isAddTaskOpened: false,
  setIsAddTaskOpened: function (): void {},
  isBoardOpened: false,
  setIsBoardOpened: function (): void {},
});

export default function ContextProvider({ children }: any) {
  const [isAddTaskOpened, setIsAddTaskOpened] = useState<boolean>(false);
  const [isBoardOpened, setIsBoardOpened] = useState<boolean>(false);

  return (
    <LocalContext.Provider
      value={{
        isAddTaskOpened,
        setIsAddTaskOpened,
        isBoardOpened,
        setIsBoardOpened,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}
