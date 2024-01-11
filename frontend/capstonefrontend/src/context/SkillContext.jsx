import { useState, useContext, createContext } from "react";

// 1. Create the context
const SkillContext = createContext();

// Custom provider component for this context.
// Use it in App.jsx like <SkillProvider>...</SkillProvider>
export const SkillProvider = (props) => {
  // store the current Skill in state at the top level
  const [currentSkills, setCurrentSkills] = useState({});

  const handleUpdateSkills = (Skill) => {
    setCurrentSkills(Skill);
  };

  // 2. Provide the context.
  // The Provider component of any context (SkillContext.Provider)
  // sends data via its value prop to all children at every level.
  // We are sending both the current Skill and an update function
  return (
    <SkillContext.Provider value={{ currentSkills, handleUpdateSkills }}>
      {props.children}
    </SkillContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useSkillContext = () => {
  return useContext(SkillContext);
};
