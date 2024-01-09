import { useState, useContext, createContext } from "react";

// 1. Create the context
const PostsContext = createContext();

// Custom provider component for this context.
// Use it in App.jsx like <PostsProvider>...</PostsProvider>
export const PostsProvider = (props) => {
  // store the current Posts in state at the top level
  const [currentPosts, setCurrentPosts] = useState({});


  // 2. Provide the context.
  // The Provider component of any context (PostsContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current Posts and an update function
  return (
    <PostsContext.Provider value={{ currentPosts, setCurrentPosts }}>
      {props.children}
    </PostsContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const usePostsContext = () => {
  return useContext(PostsContext);
};

