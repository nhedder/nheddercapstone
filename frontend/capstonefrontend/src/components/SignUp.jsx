// SignUpPage.jsx
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import FindSkill from "./FindSkill";
import { useSkillContext } from "../context/SkillContext";

const SignUp = () => {
  const [skillId, setSkillId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    displayPicture: "",
    skillId: skillId,
  });

  const { currentSkills } = useSkillContext();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful signup, such as redirecting to login page
        console.log("User registered successfully!");
      } else {
        // Handle signup error
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <TextField
          type="text"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          type="text"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          type="email"
          label="Email"
          name="emailId"
          value={formData.emailId}
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          type="text"
          label="Display Picture URL"
          name="displayPicture"
          value={formData.displayPicture}
          onChange={handleInputChange}
          required
        />
        <br />

        {Array.isArray(currentSkills) ? (
          <FindSkill skills={currentSkills} setSkillId={setSkillId} />
        ) : null}
        <br />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
