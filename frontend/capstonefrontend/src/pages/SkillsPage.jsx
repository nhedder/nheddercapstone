// SkillsPage.jsx
import React, { useEffect, useState } from "react";
import { useData } from "../hooks/useData";

import { Grid, Typography } from "@mui/material";
import CustomSkillCard from "../components/CustomSkillCard";

const SkillsPage = () => {
  // Fetch users and skills data from your backend
  const usersData = useData("http://localhost:8080/api/users/", []);
  const skillsData = useData("http://localhost:8080/api/skills/", []);

  const [usersWithSkills, setUsersWithSkills] = useState([]);

  useEffect(() => {
    // Combine users and skills data based on skillId
    const combinedData = usersData.map((user) => ({
      ...user,
      skill: skillsData.find((skill) => skill.id === user.skillId),
    }));

    setUsersWithSkills(combinedData);
  }, [usersData, skillsData]);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Skills Page
      </Typography>

      {usersData?.map((user, index) => (
        <CustomSkillCard
          title={`${user.firstName} ${user.lastName}`}
          body={`Email: ${user.emailId}\nSkill: ${
            user.skill ? user.skill.name : "No Skill"
          }`}
          displayPicture={user.displayPicture}
        />
      ))}
    </div>
  );
};

export default SkillsPage;
