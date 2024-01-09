import { useState, useContext, createContext } from "react";
import { useCookies } from "react-cookie";

// 1. Create the context
const CurrentUserContext = createContext();

// Custom provider component for this context.
// Use it in App.jsx like <CurrentUserProvider>...</CurrentUserProvider>
export const CurrentUserProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // store the current CurrentUser in state at the top level
  const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {});

  // sets CurrentUser object in state, shared via context
  const handleUpdateCurrentUser = (user) => {
    if (user.emailId) {
      setCookie("user", JSON.stringify(user), { path: "/", maxAge: 60 * 60 * 24 * 2 });
    } else {
      removeCookie("user");
    }
    setCurrentUser(user);
    console.log(user)
  };

  // 2. Provide the context.
  // The Provider component of any context (CurrentUserContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current CurrentUser and an update function
  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateCurrentUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
