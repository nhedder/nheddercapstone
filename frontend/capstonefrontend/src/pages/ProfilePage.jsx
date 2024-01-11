import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "../components/ProfileComponent";
import { useCurrentUserContext } from "../context/CurrentUserContext";

export default function ProfilePage() {
  let navigate = useNavigate();
  const [count, setCount] = useState(false);
  const { currentUser, handleUpdateCurrentUser } = useCurrentUserContext();
  console.log(currentUser);
  // state and useeffect
  //gets user profile
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/" + currentUser.id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser.id]);
  // logs user out
  const loggingOff = () => {
    handleUpdateCurrentUser({});
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 15,
          pb: 4,
        }}
      >
        <Button onClick={loggingOff}>Log out</Button>
        <ProfileComponent currentUser={currentUser} />
      </Box>
    </>
  );
}
