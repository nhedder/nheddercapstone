import { useState, useContext, createContext } from "react";

// 1. Create the context
const ReviewContext = createContext();

// Custom provider component for this context.
// Use it in App.jsx like <ReviewProvider>...</ReviewProvider>
export const ReviewProvider = (props) => {
  // store the current Review in state at the top level
  const [currentReviews, setCurrentReviews] = useState({});


  // 2. Provide the context.
  // The Provider component of any context (ReviewContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current Review and an update function
  return (
    <ReviewContext.Provider value={{ currentReviews, setCurrentReviews }}>
      {props.children}
    </ReviewContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useReviewContext = () => {
  return useContext(ReviewContext);
};
