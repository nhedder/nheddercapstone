import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useSkillContext } from "../context/SkillContext";
import { useSearchContext } from "../context/SearchContext";

export default function FindSkill(props) {
  const [skillId, setskillId] = useState(null);
  const [count, setCount] = useState(0);
  const [skill, setSkill] = useState(null);
  const { query, setQuery } = useSearchContext();
  const skills = props.skills;
  const skillOptions = skills.map((skill) => ({
    label: skill.skillName.toString(), // Convert the ID to a string
    value: skill.skillName, // Keep the ID as a number
  }));

  const getSkillId =
    skills.length !== 0 && Array.isArray(skills)
      ? skills.filter((skill) => skill.skillName === query)
      : null;
  const idSkill =
    skills.length !== 0 && Array.isArray(skills) && query !== ""
      ? getSkillId[0].id
      : null;
  const skillObj = skills.find((skill) => skill.id === skillId);

  return (
    <>
      <div>{}</div>
      <br />
      <Autocomplete
        disablePortal
        id="skill ID"
        onChange={(e, selectedOption) => {
          setskillId(selectedOption ? selectedOption.value : null);
          setQuery(selectedOption ? selectedOption.value : null);
          props.setSkillId(idSkill);
        }}
        options={skillOptions}
        getOptionLabel={(option) => option.label}
        sx={{ width: 195, margin: "0 auto", textAlign: "center" }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ textAlign: "center" }}
            label="skill ID"
          />
        )}
      />
    </>
  );
}
