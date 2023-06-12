import { createContext, useContext, useState } from "react";

export const TaskContext = createContext();
export const Handler = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("Handler must be used within a TaskContextProvider ");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  // const [user, setuser] = useState({});
  const [test, settest] = useState(true);
  const Test = () => {
    return "hello world";
  };

  return (
    <TaskContext.Provider value={{ test, settest, Test }}>
      {children}
    </TaskContext.Provider>
  );
};
