import { useState, useContext, createContext } from "react";
import { useData } from "../hooks/useData";
// 1. Create the context
const UserContext = createContext();

// Custom provider component for this context.
// Use it in App.jsx like <UserProvider>...</UserProvider>
export const UserProvider = (props) => {
  // store the current user in state at the top level
  const [users, setUsers] = useState({});
  // const userArray = useData("http://localhost:8080/api/users/", []);
  const handleUpdateUsers = (User) => {
    setUsers(User);
  };

  // 2. Provide the context.
  // The Provider component of any context (UserContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current user and an update function
  return (
    <UserContext.Provider value={{ users, handleUpdateUsers }}>
      {props.children}
    </UserContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useUserContext = () => {
  return useContext(UserContext);
};
